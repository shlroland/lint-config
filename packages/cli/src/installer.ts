import { execSync } from "node:child_process";

export function installPackages(packages: string[] | "all"): void {
  if (packages === "all") {
    console.log("正在安装所有包...");
    // 这里列出所有需要安装的包
    const allPackages = [
      "@shlroland/eslint-config",
      "@shlroland/prettier-config",
      // 添加其他包
    ];
    execSync(`npm install ${allPackages.join(" ")}`, { stdio: "inherit" });
  } else {
    console.log("正在安装选中的包...");
    execSync(`npm install ${packages.join(" ")}`, { stdio: "inherit" });
  }
  console.log("安装完成!");
}
