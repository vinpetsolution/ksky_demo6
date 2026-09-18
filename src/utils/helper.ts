interface HelperNavItem {
    href: string;
    children?: { href: string }[];
}

export const isItemActive = (
    item: HelperNavItem,
    pathname: string,
    searchParams: URLSearchParams
): boolean => {
    if (item.children) {
        return item.children.some((child) => pathname === child.href);
    }
    if (item.href.startsWith('/?')) {
        const type = new URLSearchParams(item.href.split('?')[1]).get('type');
        return pathname === '/' && searchParams.get('type') === type;
    }
    return pathname === item.href;
};
