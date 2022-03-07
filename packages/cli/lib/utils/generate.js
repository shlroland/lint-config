import semver from 'semver';
export const createDepsNameWithVersion = (pkg) => {
    var _a;
    const pkgName = pkg.name;
    const pkgVersion = pkg.version;
    const peerDeps = (_a = pkg.peerDependencies) !== null && _a !== void 0 ? _a : {};
    const peerDepsNames = Object.entries(peerDeps).map(([dep, rawVersion]) => {
        const version = semver.coerce(rawVersion).version;
        return `${dep}@${version}`;
    });
    return [`${pkgName}@${pkgVersion}`, ...peerDepsNames];
};
