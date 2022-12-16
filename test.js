namespace MyCompany {
    /**
     * Виджет кнопки
     */
    class Button {
        /**
         * Внутренний id кнопки
         */
        protected id: number;

        /**
         * DOM элемент контейнера
         */
        protected containerElement: HTMLElement;

        /**
         * Инстанс api
         */
        protected apiInstance: Api;

        /**
         * Constructor
         * @param {Api} instance
         * @param {string} containerId
         */
        public constructor(instance: Api, containerId: string) {
            this.apiInstance = instance;
            this.containerElement = document.getElementById(containerId);
        }

        /**
         * Инициализация
         */
        public init(): void {
            this.containerElement.innerHTML = 'Виджет кнопки';
        }
    }

    /**
     * Основной класс Api
     */
    export class Api {

        /**
         * Виджет кнопки
         * @param {string} containerId
         * @return {MyCompany.Button}
         */
        public button(containerId: string): Button {
            const widget = new Button(this, containerId);
            widget.init();
            return widget;
        }

        /**
         * Запуск колбеков инициализации
         */
        public runInitCallbacks(): void
        {
            let myCompanyApiInitCallbacks = (window as any).myCompanyApiInitCallbacks;
            if (myCompanyApiInitCallbacks && myCompanyApiInitCallbacks.length) {
                setTimeout(function () {
                    let callback;
                    while (callback = myCompanyApiInitCallbacks.shift()) {
                        try {
                            callback();
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }, 0);
            }
        }
    }
}

/**
 * Инициализация Api
 */
if (typeof (window as any)['myCompanyApi'] === 'undefined') {
    (window as any).myCompanyApi = new MyCompany.Api();
    (window as any).myCompanyApi.runInitCallbacks();
}