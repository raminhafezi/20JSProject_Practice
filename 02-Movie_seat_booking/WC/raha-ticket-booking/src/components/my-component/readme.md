# my-component



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute | Description | Type                                                                    | Default                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------- | --------- | ----------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columns`              | `columns` |             | `number`                                                                | `9`                                                                                                                                                                                                                                                                                                                                                                                    |
| `currentSeatPosition`  | --        |             | `object`                                                                | `JSON.parse(JSON.stringify(this.defaultSeatsPosition))`                                                                                                                                                                                                                                                                                                                                |
| `defaultSeatsPosition` | --        |             | `{ name: string; price: number; reserved: number[]; booked: any[]; }[]` | `[     {       name: 'Avengers: Engdame',       price: 10,       reserved: [1, 2, 3, 4, 5],       booked: [],     },     { name: 'Joker ', price: 12, reserved: [15, 16, 9, 2], booked: [] },     { name: 'Toy Story 4', price: 8, reserved: [1], booked: [] },     {       name: 'The Lion King',       price: 9,       reserved: [24, 25, 26, 27, 28],       booked: [],     },   ]` |
| `rows`                 | `rows`    |             | `number`                                                                | `8`                                                                                                                                                                                                                                                                                                                                                                                    |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `bookingConfirm` |             | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
