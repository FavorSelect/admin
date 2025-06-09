export function shouldHideNavigation(pathname: string): boolean {
  const patterns = [
    /^\/sellers\/all-sellers\/\d+$/,
    /^\/sellers\/pending-sellers\/\d+$/,
    /^\/tickets\/seller-tickets\/\d+$/,
    /^\/tickets\/user-tickets\/\d+$/,
  ];

  return patterns.some((pattern) => pattern.test(pathname));
}
