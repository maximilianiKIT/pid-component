import { Config } from '@stencil/core';
import tailwind, { tailwindHMR } from 'stencil-tailwind-plugin';

export const config: Config = {
  namespace: 'pid-component',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
  plugins: [tailwind(), tailwindHMR()],
  extras: {
    enableImportInjection: true,
  },
  preamble:
    '\n' +
    'Copyright 2024 Karlsruhe Institute of Technology.\n' +
    '\n' +
    'Licensed under the Apache License, Version 2.0 (the "License");\n' +
    'you may not use this file except in compliance with the License.\n' +
    'You may obtain a copy of the License at\n' +
    '\n' +
    '      http://www.apache.org/licenses/LICENSE-2.0\n' +
    '\n' +
    'Unless required by applicable law or agreed to in writing, software\n' +
    'distributed under the License is distributed on an "AS IS" BASIS,\n' +
    'WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n' +
    'See the License for the specific language governing permissions and\n' +
    'limitations under the License.\n',
};
