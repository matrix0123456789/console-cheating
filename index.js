import encodeVLQ from "./VLQ";

const ConsoleCheating = {
    makeJs(code, root, file, line) {
        let map = this.makeMap(root, file, line);
        return "//# sourceMappingURL=data:text/plain;base64," + map + "\r\n" + code;
    },
    makeMap(root, file, line) {
        let obj = {
            "version": 3,
            "file": "aa.js",
            "sourceRoot": root,
            "sources": [file],
            "sourcesContent": [null, null],
            "names": ["src", "maps", "are", "fun"],
            "mappings": encodeVLQ(0) + encodeVLQ(0) + encodeVLQ(line - 1) + encodeVLQ(0) + encodeVLQ(0)
        };
        return btoa(JSON.stringify(obj));
    },
    eval(code, root, file, line, data = null) {
        eval(this.makeJs(code, root, file, line));
    },
    log(data, root, file, line) {
        this.eval("console.log(data)", root, file, line, data)
    }
};

export default ConsoleCheating;