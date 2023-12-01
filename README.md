# Magento GDPR Extend by Vuduc (Magentiz)
> Magentiz_GdprExtend Extension, gdpr extend for magento 2.

> Magento 2 extension for configure cookie options.

> Build for https://www.elfbar.de/
![elfbar](https://raw.githubusercontent.com/vdvuong/gdpr-extend/master/docs/main.png)

## Requirements
  * Magento Community Edition 2.x or Magento Enterprise Edition 2.x.
  * Exec function needs to be enabled in PHP settings.
  * [Magento 2 GDPR](https://github.com/mageplaza/magento-2-gdpr/) and [Magento 2 GDPR Pro](https://www.mageplaza.com/magento-2-gdpr-extension/)
  * or [Magento 2 GDPR](https://raw.githubusercontent.com/vdvuong/gdpr-extend/master/docs/module/Gdpr.zip) and [Magento 2 GDPR Pro](https://raw.githubusercontent.com/vdvuong/gdpr-extend/master/docs/module/GdprPro.zip)

## Installing using archive
  * Download [ZIP Archive](https://github.com/vdvuong/gdpr-extend/archive/refs/heads/master.zip).
  * Extract files.
  * In your Magento 2 root directory create folder app/code/Magentiz/GdprExtend.
  * Copy files and folders from archive to that folder.
  * In command line, using "cd", navigate to your Magento 2 root directory.
  * Run commands:
```
php bin/magento module:enable Magentiz_GdprExtend
php bin/magento setup:upgrade
php bin/magento setup:di:compile
php bin/magento setup:static-content:deploy
```

**Don't forget to install Gdpr and GdprPro.**

## User guide

![image](https://raw.githubusercontent.com/vdvuong/gdpr-extend/master/docs/main.png)

![image](https://raw.githubusercontent.com/vdvuong/gdpr-extend/master/docs/show.png)

![image](https://raw.githubusercontent.com/vdvuong/gdpr-extend/master/docs/select.png)

## Support
If you have any issues, please [contact me](mailto:vuongvd.se@gmail.com)

## License
The code is licensed under [Open Software License ("OSL") v. 3.0](http://opensource.org/licenses/osl-3.0.php).
