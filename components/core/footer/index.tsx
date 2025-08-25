import React from 'react';
import { classNames } from 'lib/utils';
import { BoardingPass } from 'components/core/footer/boarding-pass';

type FooterProps = {
  hideCTA?: boolean;
  className?: string;
};

export const Footer = ({ hideCTA = false, className = '' }: FooterProps) => {
  return (
    <div className="z-50 w-full max-w-full overflow-x-hidden overflow-y-hidden">
      <div className={classNames('flex flex-col items-center mt-[64px] lg:mt-40 font-hero', className)}>
        <div className="flex flex-col items-center">
          <BoardingPass hideCTA={hideCTA} />
        </div>
        <div className="w-full bg-gradient-to-t from-[#f8f9fa] to-white">
          <div className="max-w-6xl mx-auto px-8 py-16">
            {/* Footer内容区域 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
              {/* 产品列 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">产品能力</h3>
                <ul className="space-y-2">
                  <li><a href="https://www.thinkingdata.cn/product/ta" className="text-gray-600 hover:text-primary">实时用户行为分析</a></li>
                  <li><a href="https://www.thinkingdata.cn/product/te" className="text-gray-600 hover:text-primary">一站式精细化运营</a></li>
                  <li><a href="https://www.thinkingdata.cn/product/cdp" className="text-gray-600 hover:text-primary">数据开发治理平台</a></li>
                  <li><a href="https://www.thinkingdata.cn/product/sdk" className="text-gray-600 hover:text-primary">自助BI数据可视化</a></li>
                  <li><a href="https://www.thinkingdata.cn/product/community" className="text-gray-600 hover:text-primary">玩家社区分析平台</a></li>
                </ul>
              </div>
              
              {/* 解决方案列 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">解决方案</h3>
                <ul className="space-y-2">
                  <li><a href="https://www.thinkingdata.cn/solution/game" className="text-gray-600 hover:text-primary">全球发行解决方案</a></li>
                  <li><a href="https://www.thinkingdata.cn/solution/retail" className="text-gray-600 hover:text-primary">研运一体解决方案</a></li>
                  <li><a href="https://www.thinkingdata.cn/solution/finance" className="text-gray-600 hover:text-primary">降本增效解决方案</a></li>
                  <li><a href="https://www.thinkingdata.cn/solution/education" className="text-gray-600 hover:text-primary">数据互联解决方案</a></li>
                </ul>
              </div>
              
              {/* 客户案例列 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">客户案例</h3>
                <ul className="space-y-2">
                  <li><a href="https://www.thinkingdata.cn/case" className="text-gray-600 hover:text-primary">成功案例</a></li>
                  <li><a href="https://www.thinkingdata.cn/testimonials" className="text-gray-600 hover:text-primary">客户见证</a></li>
                </ul>
              </div>
              
              {/* 帮助与支持列 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">帮助与支持</h3>
                <ul className="space-y-2">
                  <li><a href="https://docs.thinkingdata.cn/" className="text-gray-600 hover:text-primary">使用手册</a></li>
                  <li><a href="https://docs.thinkingdata.cn/dev" className="text-gray-600 hover:text-primary">开发文档</a></li>
                </ul>
              </div>
              
              {/* 资源中心列 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">资源中心</h3>
                <ul className="space-y-2">
                  <li><a href="https://www.thinkingdata.cn/reports" className="text-gray-600 hover:text-primary">报告&白皮书下载</a></li>
                  <li><a href="https://www.thinkingdata.cn/courses" className="text-gray-600 hover:text-primary">数数课堂</a></li>
                  <li><a href="https://www.thinkingdata.cn/blog" className="text-gray-600 hover:text-primary">博客文章</a></li>
                </ul>
              </div>
            </div>

            {/* 底部分割线和版权信息 */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className="text-gray-900 font-bold text-xl">数数科技</div>
                  <span className="text-gray-600">全球先进的游戏大数据分析服务商</span>
                </div>
                
                <div className="flex items-center space-x-6">
                  <a href="https://www.thinkingdata.cn/privacy" className="text-gray-600 hover:text-primary">隐私政策</a>
                  <a href="https://www.thinkingdata.cn/terms" className="text-gray-600 hover:text-primary">服务条款</a>
                  <a href="https://www.thinkingdata.cn/security" className="text-gray-600 hover:text-primary">安全中心</a>
                </div>
              </div>
              
              <div className="mt-4 text-center text-gray-500 text-sm">
                © 2025 数数科技(ThinkingData). 保留所有权利. | 沪ICP备12345678号
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
