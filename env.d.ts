declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    // Notion
    readonly NOTION_API_KEY: string;
    readonly NOTION_CASES_DATABASE_ID: string;
    // Next.js service
    readonly IMAGE_NAME: string;
    readonly TAG: string;
    readonly NEXTJS_INTERNAL_PORT: number;

    // Nginx service
    readonly NGINX_EXTERNAL_PORT: number;
    readonly NGINX_INTERNAL_PORT: number;

    // For docker-compose networks
    readonly NETWORK_NAME: string;
  }
}
