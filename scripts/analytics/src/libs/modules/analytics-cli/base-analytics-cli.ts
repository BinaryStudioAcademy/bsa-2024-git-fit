import { Command } from "commander";
import path from "node:path";
import pm2 from "pm2";

import { type Logger } from "~/libs/modules/logger/logger.js";

type Constructor = {
	logger: Logger;
};

class BaseAnalyticsCli {
	private logger: Logger;

	private program: Command;

	public constructor({ logger }: Constructor) {
		this.program = new Command();
		this.logger = logger;
	}

	private setupCommands(): void {
		this.program
			.command("track <apiKey> <userId> <repoPath>")
			.description("Start the background job for collecting statistics")
			.action((apiKey: string, userId: string, repoPath: string) => {
				if (!apiKey || !userId || !repoPath) {
					this.logger.error("Not all command arguments were provided.");

					return;
				}

				const scriptPath = path.resolve(
					import.meta.dirname,
					"init-analytics-cli.js",
				);
				pm2.connect((error: Error | null) => {
					if (error !== null) {
						this.logger.error("PM2 connection error:", {
							message: error.message,
							stack: error.stack,
						});

						return;
					}

					pm2.start(
						{
							args: [apiKey, userId, repoPath],
							error: "analytics-errors.log",
							name: "analytics-cli",
							output: "analytics-output.log",
							script: scriptPath,
						},
						(startError: Error | null) => {
							if (startError !== null) {
								this.logger.error("PM2 start error:", {
									message: startError.message,
									stack: startError.stack,
								});
							}

							pm2.disconnect();
						},
					);
				});

				this.logger.info("Started background job for collecting analytics.");
			});
	}

	public init(): void {
		this.logger.info("Initializing Analytics CLI...");

		this.program
			.name("CLI Analytics")
			.description("CLI tool to collect repositories data and send analytics.")
			.version("1.0.0");

		this.setupCommands();

		this.program.parse(process.argv);

		this.logger.info("Analytics CLI started.");
	}
}

export { BaseAnalyticsCli };
