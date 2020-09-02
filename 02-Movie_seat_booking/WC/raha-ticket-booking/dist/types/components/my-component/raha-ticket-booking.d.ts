import { EventEmitter } from '../../stencil-public-runtime';
export declare class MyComponent {
    rows: number;
    columns: number;
    defaultSeatsPosition: {
        name: string;
        price: number;
        reserved: number[];
        booked: any[];
    }[];
    selectedMovieIndex: number;
    currentSeatPosition: object;
    bookedSeats: any[];
    count: number;
    total: number;
    container: HTMLElement;
    screen: HTMLElement;
    bookingConfirm: EventEmitter;
    private toggleBookedCssClass;
    private bookedSeatsIndex;
    private movieChangeandler;
    private updateUI;
    private cleanCssClass;
    private updateCssClass;
    componentDidLoad(): void;
    private calculateReceipt;
    private displayOnScreen;
    private seatPositionElement;
    private movieDropDownElement;
    private cancelBtnHandler;
    private confirmBtnHandler;
    render(): any[];
}
