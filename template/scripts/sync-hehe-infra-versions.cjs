/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const pkgPath = path.join(root, "package.json");
const verPath = path.join(root, "hehe-infra-versions", "versions.json");

function readJSON(p){ return JSON.parse(fs.readFileSync(p, "utf-8")); }
function writeJSON(p,o){ fs.writeFileSync(p, JSON.stringify(o, null, 2) + "\n"); }

try {
  if (!fs.existsSync(verPath)) {
    console.warn("[sync-hehe-infra-versions] missing hehe-infra-versions/versions.json, skip");
    process.exit(0);
  }
  const pkg = readJSON(pkgPath);
  const ver = readJSON(verPath);

  // 1) 单仓开发需要的精确版本（devDependencies）
  pkg.devDependencies = pkg.devDependencies || {};
  for (const [k,v] of Object.entries(ver.devExact || {})) {
    pkg.devDependencies[k] = v;
  }

  // 2) 锁版本（overrides）
  pkg.overrides = Object.assign({}, ver.overrides || {}, pkg.overrides || {});

  // 3) 运行时基础库的 peer 范围（infraPeers）
  pkg.peerDependencies = pkg.peerDependencies || {};
  for (const [k,v] of Object.entries(ver.infraPeers || {})) {
    pkg.peerDependencies[k] = v;
  }

  writeJSON(pkgPath, pkg);
  console.log("[sync-hehe-infra-versions] synced from hehe-infra-versions/versions.json");
} catch (e) {
  console.error("[sync-hehe-infra-versions] failed:", e);
  process.exit(1);
}
