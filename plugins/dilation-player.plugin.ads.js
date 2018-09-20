// ====================================================
// Plugin {DPAds}
// ====================================================
class DPAdsPlugin extends DPBase {
    /**
     * constructor
     * @param app
     */
    constructor(app) {
        super();
        this.config = app.config;
        this.app = app;
        this.helper = app.helper;
        this.currentSetting = {};
        this.usedType = [];
    }

    /**
     * Run
     * @return {DilationPlayerPluginsAds}
     */
    init() {
        let icon = this.config.get('icons.close');
        let close = this.config.get('elements.adsClose', true);
        let ads = this.config.get('elements.ads');
        let pl = this;

        // Event when click on button close
        close.on('click', function () {
            $(this).closest(ads).removeClass('active');
        });

        close.html(icon);

        $(window).resize(function(){
            pl.resize();
        });

        return this;
    }

    /**
     * Resize
     */
    resize(){
        if (this.currentSetting.type === 'line') {
            let ads = this.config.get('elements.ads', true);
            let height = ads.css('height');
            ads.css('marginTop', '-'+height);
        }
    }

    /**
     * Run
     * @return {DilationPlayerPluginsAds}
     */
    show(content, conf) {
        let ads = this.config.get('elements.ads', true);
        let adsClose = this.config.get('elements.adsClose', true);
        let adsContent = this.config.get('elements.adsContent', true);
        let pl = this;

        this.currentSetting = this.or(conf, {});
        this.currentSetting.type = this.or(this.currentSetting.type, 'line');

        ads.removeClass(this.usedType.join(' '))
            .addClass(this.currentSetting.type);

        this.usedType.push(this.currentSetting.type);

        ads.addClass('active');
        adsClose.addClass('active');

        if (content !== undefined) {
            adsContent.html(content);
        }

        pl.resize();
    }
}