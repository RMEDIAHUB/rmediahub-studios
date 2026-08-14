/**
 * RMEDIAHUB Studios for Lampa
 * Independent Russian-language catalogue plugin.
 *
 * Version: 1.0.0
 * License: MIT
 *
 * The plugin does not provide video streams. It only opens TMDB catalogue
 * selections through Lampa's built-in TMDB source.
 */
(function () {
    'use strict';

    if (window.rmediahub_studios_ready) return;
    window.rmediahub_studios_ready = true;

    var PLUGIN = 'rmediahub_studios';
    var VERSION = '1.0.0';

    var ICONS = {
        netflix: brandIcon('N', '#e50914'),
        apple: brandIcon('A', '#ffffff'),
        max: brandIcon('M', '#6d5dfc'),
        prime: brandIcon('P', '#00a8e1'),
        disney: brandIcon('D', '#7aa7ff'),
        hulu: brandIcon('H', '#1ce783'),
        paramount: brandIcon('P+', '#4f8cff'),
        syfy: brandIcon('S', '#ffffff'),
        knowledge: questionIcon()
    };

    function brandIcon(label, color) {
        var size = label.length > 1 ? '15' : '22';
        return '<svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<circle cx="22" cy="22" r="18" fill="none" stroke="' + color + '" stroke-width="3"/>' +
            '<text x="22" y="29" text-anchor="middle" font-family="Arial,sans-serif" font-size="' + size + '" font-weight="700" fill="' + color + '">' + label + '</text>' +
            '</svg>';
    }

    function questionIcon() {
        return '<svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<circle cx="22" cy="22" r="18" fill="#f5a623"/>' +
            '<path d="M16.5 16.5c.7-4 4-6 7.8-5.4 3.7.5 6.2 3 6.2 6.2 0 3.4-2.2 5-4.5 6.5-2 1.3-2.7 2.2-2.7 4.2" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/>' +
            '<circle cx="23.2" cy="33" r="1.8" fill="#111"/>' +
            '</svg>';
    }

    function movie(title, query) {
        return { title: title, path: 'discover/movie?' + query };
    }

    function tv(title, query) {
        return { title: title, path: 'discover/tv?' + query };
    }

    function providerMovie(title, provider, extra) {
        return movie(title, 'with_watch_providers=' + provider + '&watch_region={region}&sort_by=popularity.desc' + (extra ? '&' + extra : ''));
    }

    function providerTv(title, provider, extra) {
        return tv(title, 'with_watch_providers=' + provider + '&watch_region={region}&sort_by=popularity.desc' + (extra ? '&' + extra : ''));
    }

    var SERVICES = [
        {
            id: 'netflix', title: 'Netflix', icon: ICONS.netflix, categories: [
                providerMovie('Популярные фильмы', 8),
                providerTv('Популярные сериалы', 8),
                providerMovie('Новые фильмы', 8, 'primary_release_date.gte={year}-01-01'),
                providerTv('Новые сериалы', 8, 'first_air_date.gte={year}-01-01'),
                providerMovie('Боевики и блокбастеры', 8, 'with_genres=28'),
                providerTv('Фантастика и фэнтези', 8, 'with_genres=10765'),
                providerTv('Криминальные сериалы', 8, 'with_genres=80'),
                providerTv('Корейские сериалы', 8, 'with_original_language=ko'),
                providerTv('Аниме', 8, 'with_genres=16&with_original_language=ja'),
                providerMovie('Документальные фильмы', 8, 'with_genres=99')
            ]
        },
        {
            id: 'apple', title: 'Apple TV+', icon: ICONS.apple, categories: [
                providerMovie('Фильмы Apple TV+', 350),
                providerTv('Сериалы Apple TV+', 350),
                providerMovie('Новые фильмы', 350, 'primary_release_date.gte={year}-01-01'),
                providerTv('Новые сериалы', 350, 'first_air_date.gte={year}-01-01'),
                providerTv('Фантастика', 350, 'with_genres=10765'),
                providerTv('Драмы', 350, 'with_genres=18'),
                providerTv('Комедии', 350, 'with_genres=35'),
                providerMovie('Триллеры', 350, 'with_genres=53')
            ]
        },
        {
            id: 'max', title: 'HBO / Max', icon: ICONS.max, categories: [
                providerMovie('Популярные фильмы', 1899),
                providerTv('Популярные сериалы', 1899),
                tv('Лучшие сериалы HBO', 'with_networks=49&sort_by=vote_count.desc'),
                providerTv('Новые сериалы', 1899, 'first_air_date.gte={year}-01-01'),
                providerTv('Драмы', 1899, 'with_genres=18'),
                providerTv('Криминал', 1899, 'with_genres=80'),
                providerTv('Фэнтези и фантастика', 1899, 'with_genres=10765'),
                providerMovie('DC и супергерои', 1899, 'with_genres=28&with_keywords=9715')
            ]
        },
        {
            id: 'prime', title: 'Prime Video', icon: ICONS.prime, categories: [
                providerMovie('Популярные фильмы', 9),
                providerTv('Популярные сериалы', 9),
                providerMovie('Новые фильмы', 9, 'primary_release_date.gte={year}-01-01'),
                providerTv('Новые сериалы', 9, 'first_air_date.gte={year}-01-01'),
                providerMovie('Боевики', 9, 'with_genres=28'),
                providerTv('Фантастика и фэнтези', 9, 'with_genres=10765'),
                providerTv('Комедии', 9, 'with_genres=35'),
                providerMovie('Лучшее по оценкам', 9, 'sort_by=vote_average.desc&vote_count.gte=500')
            ]
        },
        {
            id: 'disney', title: 'Disney+', icon: ICONS.disney, categories: [
                providerMovie('Популярные фильмы', 337),
                providerTv('Популярные сериалы', 337),
                providerMovie('Новые фильмы', 337, 'primary_release_date.gte={year}-01-01'),
                movie('Marvel', 'with_companies=420&sort_by=popularity.desc'),
                tv('Сериалы Marvel', 'with_companies=420&sort_by=popularity.desc'),
                movie('Звёздные войны', 'with_companies=1&with_keywords=11195&sort_by=popularity.desc'),
                movie('Pixar', 'with_companies=3&sort_by=popularity.desc'),
                providerMovie('Мультфильмы Disney', 337, 'with_genres=16'),
                providerTv('Для всей семьи', 337, 'with_genres=10751')
            ]
        },
        {
            id: 'hulu', title: 'Hulu', icon: ICONS.hulu, categories: [
                providerMovie('Популярные фильмы', 15),
                providerTv('Популярные сериалы', 15),
                providerTv('Новые сериалы', 15, 'first_air_date.gte={year}-01-01'),
                providerTv('Драмы', 15, 'with_genres=18'),
                providerTv('Комедии', 15, 'with_genres=35'),
                providerTv('Триллеры и криминал', 15, 'with_genres=80'),
                providerTv('Анимация для взрослых', 15, 'with_genres=16')
            ]
        },
        {
            id: 'paramount', title: 'Paramount+', icon: ICONS.paramount, categories: [
                providerMovie('Популярные фильмы', 531),
                providerTv('Популярные сериалы', 531),
                providerTv('Новые сериалы', 531, 'first_air_date.gte={year}-01-01'),
                movie('Фильмы Paramount', 'with_companies=4&sort_by=popularity.desc'),
                tv('Вселенная Yellowstone', 'with_keywords=241229&sort_by=popularity.desc'),
                tv('Звёздный путь', 'with_keywords=1377&sort_by=popularity.desc'),
                providerTv('Детям и семье', 531, 'with_genres=10762')
            ]
        },
        {
            id: 'syfy', title: 'Syfy', icon: ICONS.syfy, categories: [
                tv('Популярное на Syfy', 'with_networks=77&sort_by=popularity.desc'),
                tv('Лучшее по оценкам', 'with_networks=77&sort_by=vote_count.desc'),
                tv('Новые сериалы', 'with_networks=77&first_air_date.gte={year}-01-01&sort_by=popularity.desc'),
                tv('Научная фантастика', 'with_networks=77&with_genres=10765&sort_by=popularity.desc'),
                tv('Ужасы и мистика', 'with_networks=77&with_genres=9648&sort_by=popularity.desc')
            ]
        },
        {
            id: 'knowledge', title: 'Познавательные', icon: ICONS.knowledge, categories: [
                tv('Discovery', 'with_networks=64&sort_by=popularity.desc'),
                tv('National Geographic', 'with_networks=43&sort_by=popularity.desc'),
                tv('Animal Planet', 'with_networks=91&sort_by=popularity.desc'),
                tv('BBC: документальные сериалы', 'with_networks=332&with_genres=99&sort_by=popularity.desc'),
                tv('History', 'with_networks=65&sort_by=popularity.desc'),
                tv('Наука и технологии', 'with_genres=99&with_keywords=287501&sort_by=popularity.desc'),
                tv('Путешествия', 'with_genres=99&with_keywords=180547&sort_by=popularity.desc'),
                tv('Выживание', 'with_genres=10764&with_keywords=10349&sort_by=popularity.desc'),
                tv('Кулинария', 'with_genres=10764&with_keywords=18267&sort_by=popularity.desc'),
                movie('Документальные фильмы', 'with_genres=99&sort_by=popularity.desc')
            ]
        }
    ];

    function settingName(id) {
        return PLUGIN + '_show_' + id;
    }

    function getRegion() {
        return Lampa.Storage.get(PLUGIN + '_region', 'UA') || 'UA';
    }

    function enabled(service) {
        return Lampa.Storage.get(settingName(service.id), true) !== false;
    }

    function preparePath(path) {
        return path
            .replace(/\{region\}/g, encodeURIComponent(getRegion()))
            .replace(/\{year\}/g, String(new Date().getFullYear()));
    }

    function openCategory(service, category) {
        Lampa.Controller.toggle('content');
        Lampa.Activity.push({
            url: preparePath(category.path),
            title: service.title + ' — ' + category.title,
            component: 'category_full',
            source: 'tmdb',
            card_type: true,
            page: 1
        });
    }

    function openService(service) {
        Lampa.Select.show({
            title: service.title + ' — подборки',
            items: service.categories.map(function (category) {
                return { title: category.title, category: category };
            }),
            onSelect: function (item) {
                openCategory(service, item.category);
            },
            onBack: function () {
                Lampa.Controller.toggle('menu');
            }
        });
    }

    function makeMenuItem(service) {
        var button = $('<li class="menu__item selector rmediahub-studios-menu" data-rmediahub-service="' + service.id + '">' +
            '<div class="menu__ico">' + service.icon + '</div>' +
            '<div class="menu__text">' + service.title + '</div>' +
            '</li>');

        button.on('hover:enter', function () {
            openService(service);
        });

        return button;
    }

    function refreshMenu() {
        $('.rmediahub-studios-menu').remove();

        var list = $('.menu .menu__list').eq(0);
        if (!list.length) return;

        SERVICES.forEach(function (service) {
            if (enabled(service)) list.append(makeMenuItem(service));
        });
    }

    function addSettings() {
        Lampa.SettingsApi.addComponent({
            component: PLUGIN,
            name: 'RMEDIAHUB Studios',
            icon: questionIcon()
        });

        Lampa.SettingsApi.addParam({
            component: PLUGIN,
            param: { type: 'title' },
            field: { name: 'Каталоги в боковом меню' }
        });

        SERVICES.forEach(function (service) {
            Lampa.SettingsApi.addParam({
                component: PLUGIN,
                param: {
                    name: settingName(service.id),
                    type: 'trigger',
                    default: true
                },
                field: {
                    name: service.title,
                    description: 'Показывать пункт «' + service.title + '» в боковом меню'
                },
                onChange: function () {
                    setTimeout(refreshMenu, 50);
                }
            });
        });

        Lampa.SettingsApi.addParam({
            component: PLUGIN,
            param: { type: 'title' },
            field: { name: 'Регион каталогов' }
        });

        Lampa.SettingsApi.addParam({
            component: PLUGIN,
            param: {
                name: PLUGIN + '_region',
                type: 'select',
                values: {
                    UA: 'Украина',
                    US: 'США',
                    GB: 'Великобритания',
                    DE: 'Германия',
                    PL: 'Польша'
                },
                default: 'UA'
            },
            field: {
                name: 'Регион доступности',
                description: 'Влияет на каталоги стримингов, но не предоставляет подписку или просмотр'
            }
        });

        Lampa.SettingsApi.addParam({
            component: PLUGIN,
            param: { type: 'static' },
            field: {
                name: 'Версия',
                description: VERSION
            }
        });
    }

    function start() {
        Lampa.Manifest.plugins = {
            type: 'other',
            version: VERSION,
            name: 'RMEDIAHUB Studios',
            description: 'Русские подборки стримингов в боковом меню',
            component: PLUGIN
        };

        addSettings();
        refreshMenu();

        // Some Lampa builds redraw the menu after account/profile changes.
        Lampa.Listener.follow('activity', function (event) {
            if (event && (event.type === 'start' || event.type === 'archive')) {
                setTimeout(function () {
                    if (!$('.rmediahub-studios-menu').length) refreshMenu();
                }, 100);
            }
        });
    }

    if (window.appready) start();
    else {
        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') start();
        });
    }
})();
