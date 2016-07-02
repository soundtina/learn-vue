<template>

    <div class="setting">
        <span @click="switch" class="icon-setting"></span>
        <div class="settingbox" v-show="isedit">
            <div class="card">
                <div class="card-content white-text">
                    <span class="card-title">Setting</span>
                    <ul class="setting-item">
                        <li>
                            <span>{{$t('settings.language')}}</span>
                            <div class="right">
                                <span class="pointer" :class="{ 'teal-text text-lighten-1': (lang!='zh-CN')}" @click="onLanguage('zh-CN')">中文</span>
                                &nbsp;/&nbsp;
                                <span class="pointer" :class="{ 'teal-text text-lighten-1': (lang!='en-US')}" @click="onLanguage('en-US')">English</span>
                            </div>
                        </li>
                        <li>
                            <span>自动更换壁纸</span>
                            <div class="right">
                                <div class="switch">
                                    <label>
                                        <input type="checkbox">
                                        <span class="lever"></span>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="card-action ">
                    <a href="#" class="grey-text text-lighten-1">Prowered By VUE.js</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { setCookie, getCookieByName } from '../../utils/other.js';

    export default {
        name: 'Setting',
        data: () => {
            return {
                isedit: false,
                lang:getCookieByName("todos_lang")
            }
        },
        methods: {
            switch () {
                this.isedit = !this.isedit
            },
            onLanguage(lang) {
                const oldLang = getCookieByName('todos_lang');

                if (oldLang === lang) { return; }

                setCookie('todos_lang', lang);
                location.reload();
            }
        }
    };
</script>

<style>
    .switch {
        display: inline-block;
    }

    .setting {
        position: absolute;
        bottom: 0rem;
        left: 0rem;
    }

    .icon-setting {
        position: absolute;
        left: 2rem;
        bottom: 2rem;
    }

    .settingbox {
        position: fixed;
        bottom: 5rem;
        left: .5rem;
        width: 30rem;
        border-radius: 2px;
    }

    .card {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .setting-item li {
        border-bottom: 1px rgba(255, 255, 255, .5) solid;
        padding-bottom: .5rem;
        margin-bottom: .5rem;
    }
</style>
