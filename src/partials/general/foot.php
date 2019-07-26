<!-- .JS -->
<script type="text/javascript">
    let app_settings = {
        shortname: '<?=getenv("SHORT_NAME"); ?>',
        base_url: '<?=getenv("URL_BASE"); ?>',
        api_url: null,
    };
</script>
<script type="text/javascript" src="<?=getenv("URL_BASE"); ?>/dist/js/libraries.min.js"></script>
<script type="text/javascript" src="<?=getenv("URL_BASE"); ?>/dist/js/vt.min.js"></script>
<script type="text/javascript" src="<?=getenv("URL_BASE"); ?>/dist/js/app.min.js"></script>