/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface RahaRandomUsers {
    }
}
declare global {
    interface HTMLRahaRandomUsersElement extends Components.RahaRandomUsers, HTMLStencilElement {
    }
    var HTMLRahaRandomUsersElement: {
        prototype: HTMLRahaRandomUsersElement;
        new (): HTMLRahaRandomUsersElement;
    };
    interface HTMLElementTagNameMap {
        "raha-random-users": HTMLRahaRandomUsersElement;
    }
}
declare namespace LocalJSX {
    interface RahaRandomUsers {
    }
    interface IntrinsicElements {
        "raha-random-users": RahaRandomUsers;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "raha-random-users": LocalJSX.RahaRandomUsers & JSXBase.HTMLAttributes<HTMLRahaRandomUsersElement>;
        }
    }
}
