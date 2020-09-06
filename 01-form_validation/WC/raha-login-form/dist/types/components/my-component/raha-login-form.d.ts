import { EventEmitter } from '../../stencil-public-runtime';
export declare class MyComponent {
    formTitle: String;
    username: HTMLInputElement;
    userNameValue: string;
    usernameIsValid: boolean;
    usernameRe: RegExp;
    minUsernameLength: number;
    email: HTMLInputElement;
    emailValue: string;
    checkEmailRe: RegExp;
    emailIsValid: boolean;
    password: HTMLInputElement;
    password2: HTMLInputElement;
    passwordValue: string;
    password2Value: string;
    mediumPassRe: RegExp;
    strongPassRe: RegExp;
    passwordIsValid: boolean;
    minPassLength: number;
    strongPassLegth: number;
    passwordsMatch: boolean;
    strongPass: boolean;
    mediumPass: boolean;
    submitBtn: HTMLElement;
    rahaLoginEvent: EventEmitter;
    usernameValidationHandler(): void;
    emailValidationHandler(): void;
    passwordValidatorHandler(): void;
    passwordsMatchHandler(): void;
    onUsernameValueChanges(): void;
    emailValidation(): void;
    passPowHandler(): void;
    passConfirmationHandler(): void;
    toggleCssClassAndHint(element: HTMLInputElement, classList: Object, hintUpdate: string): void;
    submitform(): void;
    formSublit(event: Event): void;
    render(): any[];
}