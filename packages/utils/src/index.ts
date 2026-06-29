import type { Argument } from 'classnames';
import cn from 'classnames';

/**
 * 获取 class 前缀
 * @param suffixCls 后缀名
 * @param customizePrefixCls 自定义前缀名，未传递时使用 wwj 作为默认前缀
 */
export const getPrefixCls = (suffixCls?: string, customizePrefixCls = 'wwj') => {
  return suffixCls ? `${customizePrefixCls}-${suffixCls}` : customizePrefixCls;
};

/**
 * 类似于 classnames，生成一批带有类名前缀的 class 字符串
 * 用法：
 *   const cls = createPrefixCls('button');
 *   cls('primary')                      // 'wwj-button-primary'
 *   cls({ active: true })               // 'wwj-button-active'
 *   cls('primary', { active: true })    // 'wwj-button-primary wwj-button-active'
 * @param prefix 前缀名称
 * @returns 带有前缀的 classNames 函数
 */
export function createPrefixCls(prefix: string) {
  const prefixCls = getPrefixCls(prefix);

  function cls(...args: (Argument | Argument[])[]) {
    const config = args.map((cfg) => {
      if (Array.isArray(cfg)) {
        return cls(...(cfg as Argument[]));
      }
      if (typeof cfg === 'string') {
        return `${prefixCls}-${cfg}`;
      }
      if (typeof cfg === 'object' && cfg !== null) {
        return Object.keys(cfg).reduce(
          (r, key) => ({
            ...r,
            [`${prefixCls}-${key}`]: (cfg as Record<string, any>)[key],
          }),
          {},
        );
      }
      return cfg;
    }) as Argument[];
    return cn(config);
  }

  cls.prefixCls = prefixCls;
  return cls;
}
