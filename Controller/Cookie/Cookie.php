<?php
/**
 * Copyright © Open Techiz. All rights reserved.
 * See LICENSE.txt for license details (http://opensource.org/licenses/osl-3.0.php).
 */

namespace Magentiz\GdprExtend\Controller\Cookie;

use Magento\Cookie\Helper\Cookie as HelperCookie;

/**
 * Class Cookie
 * @package Mageplaza\GdprPro\Controller\Cookie
 */
class Cookie extends \Mageplaza\GdprPro\Controller\Cookie\Cookie
{
    /**
     * @param \Mageplaza\GdprPro\Controller\Cookie\Cookie $subject
     * @param \Closure $proceed
     * @return \Magento\Framework\Controller\Result\Json
     */
    public function aroundExecute(\Mageplaza\GdprPro\Controller\Cookie\Cookie $subject, \Closure $proceed)
    {
        $result     = $this->_resultJsonFactory->create();
        $resultPage = $this->_resultPageFactory->create();

        $block = $resultPage->getLayout()
            ->createBlock(\Magentiz\GdprExtend\Block\Cookie::class)
            ->setTemplate('Magentiz_GdprExtend::cookie/notices.phtml')
            ->toHtml();

        $result->setData([
            'output'            => $block,
            'checkCookieEnable' => $this->_helperData->isEnableCookieRestrictrion(),
            'cookieName'        => HelperCookie::IS_USER_ALLOWED_SAVE_COOKIE,
            'cookieValue'       => $this->_cookieHelper->getAcceptedSaveCookiesWebsiteIds(),
            'cookieLifetime'    => $this->_cookieHelper->getCookieRestrictionLifetime(),
            'noCookiesUrl'      => $this->urlBuilder->getUrl('cookie/index/noCookies')
        ]);

        return $result;
    }
}
