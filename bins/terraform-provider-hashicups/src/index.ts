import { run } from '@terraform-typescript/terraform-provider';

import { hashicupsProvider } from './hashicupsProvider';

run(hashicupsProvider);
