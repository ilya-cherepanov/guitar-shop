#!/usr/bin/env node

import { CommandFactory } from 'nest-commander';
import { CliModule } from './app/cli/cli.module';


async function bootstrap() {
  await CommandFactory.run(CliModule, ['error', 'warn']);
}


bootstrap();
