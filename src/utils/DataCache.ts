/**
 * This class is a wrapper around the Cache API.
 */
export class DataCache {
  private readonly name: string;
  private cacheInstance: Cache = undefined;

  /**
   * Creates a new DataCache instance.
   * @param name The name of the cache.
   * @constructor
   */
  constructor(name: string) {
    this.name = name;
  }

  async open() {
    console.log(`Opening cache ${this.name}`);
    if ('caches' in self) {
      this.cacheInstance = await caches.open(this.name)
      console.log(`Cache ${this.name} opened`);
    } else {
      console.log(`Caching not supported in this browser.`);
    }
  }

  /**
   * Fetches a resource from the cache or the network.
   * Acts as a wrapper around the Cache API and the fetch API.
   * @param url The URL of the resource to fetch.
   * @param init The options for the fetch request.
   * @returns {Promise<Response>} The response of the fetch request.
   */
  async fetch(url: string, init?: any): Promise<any> {
    if (this.cacheInstance) {
      // If there is a cache available, check if the resource is cached.
      const response = await this.cacheInstance.match(url);
      if (response) {
        // If the resource is cached, return it.
        // console.log(`Cache ${this.name} hit for ${url}`, response);
        return response.json();
      } else {
        // If the resource is not cached, fetch it from the network, cache and return it.
        let response: Response;
        const parts = url.split('://');
        if (parts[0] !== 'https') {
          // if not https, make it https
          response = await fetch(`https://${parts[1]}`, init);
          if (!response) {
            // if https fails, try http as fallback
            console.log(`404 for https://${parts[1]} - trying http://${parts[1]}`);
            response = await fetch(`http://${parts[1]}`, init);
          }
        } else {
          // if https, use it
          response = await fetch(url, init);
        }

        // add to cache and return
        await this.cacheInstance.put(url, response.clone());
        return response.json();
      }
    } else {
      // If there is no cache available, fetch the resource from the network.
      // console.log("No caching available - fetching from network");
      const response = await fetch(url, init);
      return response.json();
    }
  }
}

/**
 * Initializes a new DataCache instance.
 * @param name The name of the cache.
 * @returns {Promise<DataCache>} The initialized DataCache instance.
 * @async
 */
export const init = async (name: string) => {
  const dataCache = new DataCache(name);
  await dataCache.open();
  return dataCache;
}