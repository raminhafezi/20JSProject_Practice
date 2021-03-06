/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface RahaSliderModal {
        "navBarLinks": string;
        "sliderPic": { src: string; alt: string; };
    }
}
declare global {
    interface HTMLRahaSliderModalElement extends Components.RahaSliderModal, HTMLStencilElement {
    }
    var HTMLRahaSliderModalElement: {
        prototype: HTMLRahaSliderModalElement;
        new (): HTMLRahaSliderModalElement;
    };
    interface HTMLElementTagNameMap {
        "raha-slider-modal": HTMLRahaSliderModalElement;
    }
}
declare namespace LocalJSX {
    interface RahaSliderModal {
        "navBarLinks"?: string;
        "sliderPic"?: { src: string; alt: string; };
    }
    interface IntrinsicElements {
        "raha-slider-modal": RahaSliderModal;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "raha-slider-modal": LocalJSX.RahaSliderModal & JSXBase.HTMLAttributes<HTMLRahaSliderModalElement>;
        }
    }
}
