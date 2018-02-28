export default class Utils {
    // 检查这个 item 是否被收藏
    static checkFavorite(item, items) {
        for (var i = 0, len = items.length; i < len; ++ i) {
            let id = item.id ? item.id.toString() : item.fullName;
            if (id === items[i]) {
                return true;
            }
        }
        return false;
    }
}