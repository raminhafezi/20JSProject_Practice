/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface RahaCustomPlayer {
        "src": string;
    }
}
declare global {
    interface HTMLRahaCustomPlayerElement extends Components.RahaCustomPlayer, HTMLStencilElement {
    }
    var HTMLRahaCustomPlayerElement: {
        prototype: HTMLRahaCustomPlayerElement;
        new (): HTMLRahaCustomPlayerElement;
    };
    interface HTMLElementTagNameMap {
        "raha-custom-player": HTMLRahaCustomPlayerElement;
    }
}
declare namespace LocalJSX {
    interface RahaCustomPlayer {
        "src"?: string;
    }
    interface IntrinsicElements {
        "raha-custom-player": RahaCustomPlayer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "raha-custom-player": LocalJSX.RahaCustomPlayer & JSXBase.HTMLAttributes<HTMLRahaCustomPlayerElement>;
        }
    }
}
