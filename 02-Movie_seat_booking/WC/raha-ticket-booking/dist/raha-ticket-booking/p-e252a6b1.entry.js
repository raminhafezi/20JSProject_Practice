import{r as e,c as t,h as s}from"./p-1208255e.js";const o=class{constructor(s){e(this,s),this.bookingConfirm=t(this,"bookingConfirm",7),this.rows=8,this.columns=9,this.defaultSeatsPosition=[{name:"Avengers: Engdame",price:10,reserved:[1,2,3,4,5],booked:[]},{name:"Joker ",price:12,reserved:[15,16,9,2],booked:[]},{name:"Toy Story 4",price:8,reserved:[1],booked:[]},{name:"The Lion King",price:9,reserved:[24,25,26,27,28],booked:[]}],this.selectedMovieIndex=0,this.currentSeatPosition=JSON.parse(JSON.stringify(this.defaultSeatsPosition)),this.bookedSeats=[],this.count=0,this.total=0}toggleBookedCssClass(e){e.target.classList.contains("seat")&&!e.target.classList.contains("reserved")&&(e.target.classList.toggle("booked"),this.currentSeatPosition[this.selectedMovieIndex].booked=this.bookedSeatsIndex(),this.calculateReceipt(),localStorage.setItem("currentSeatsPosition",JSON.stringify(this.currentSeatPosition)))}bookedSeatsIndex(){let e=Array.from(this.container.querySelectorAll(".row .seat"));return[...Array.from(this.container.querySelectorAll(".row .seat.booked"))].map(t=>[...Array.from(e)].indexOf(t))}movieChangeandler(e){this.selectedMovieIndex=e.target.selectedIndex,this.updateUI()}updateUI(){this.cleanCssClass(),this.updateCssClass()}cleanCssClass(){Array.from(this.container.querySelectorAll(".row .seat")).forEach(e=>{e.classList.remove("booked"),e.classList.remove("reserved")})}updateCssClass(){let e=Array.from(this.container.querySelectorAll(".seat")),t=this.currentSeatPosition[this.selectedMovieIndex].booked;this.currentSeatPosition[this.selectedMovieIndex].reserved.forEach(t=>{e[t].classList.add("reserved")}),t.forEach(t=>{e[t].classList.add("booked")}),this.calculateReceipt()}componentDidLoad(){this.updateUI()}calculateReceipt(){let e="",t=Object.entries(this.currentSeatPosition);t.forEach(t=>{t[1].booked.length>0&&(e+=`<li> <strong> ${t[1].name}, </strong>${t[1].booked.length} * ${t[1].price}$ = ${t[1].booked.length*t[1].price}$</li>`)}),this.total=t.reduce((e,t)=>(t[1].booked.length>0&&(e+=+t[1].price*t[1].booked.length),e),0),this.count=t.reduce((e,t)=>(t[1].booked.length>0&&(e+=t[1].booked.length),e),0),this.total>0&&(e+=`<li> TOTAL Cost = ${this.total} $</li>`),this.displayOnScreen(e)}displayOnScreen(e){this.screen.innerHTML=e}seatPositionElement(){let e=[],t=[];for(let o=0;o<this.rows;o++){for(let e=0;e<this.columns;e++)t.push(s("div",{class:{seat:!0}}));e.push(s("div",{class:"row"},t)),t=[]}return e}movieDropDownElement(){let e=[];return Object.entries(this.currentSeatPosition).forEach(t=>{e.push(s("option",null,t[1].name," ",s("strong",null,"(",t[1].price,"$)")))}),e}cancelBtnHandler(){this.currentSeatPosition=JSON.parse(JSON.stringify(this.defaultSeatsPosition)),this.updateUI()}confirmBtnHandler(){let e=[];Object.entries(this.currentSeatPosition).forEach(t=>{+t[1].booked.length>0&&e.push({name:t[1].name,Quantity:t[1].booked.length,Seat_Number:[...t[1].booked],Cost:t[1].booked.length*t[1].price})}),e.unshift({Number_of_tickets:this.count,Total_Cost:this.total}),this.bookingConfirm.emit(e),console.log(e);let t=JSON.parse(JSON.stringify(this.currentSeatPosition));t.forEach(e=>{e.reserved=JSON.parse(JSON.stringify(e.reserved.concat(e.booked))),e.booked=[]}),this.currentSeatPosition=JSON.parse(JSON.stringify(t)),this.updateUI()}render(){return[s("div",{class:"movie-container"},s("label",null," Pick a Movie"),s("select",{name:"movie",id:"movie",onChange:e=>this.movieChangeandler(e)},this.movieDropDownElement())),s("ul",{class:"showcase"},s("li",null,s("div",{class:"seat"}),s("small",null,"N/A")),s("li",null,s("div",{class:"seat booked"}),s("small",null,"Select")),s("li",null,s("div",{class:"seat reserved"}),s("small",null,"Reserved"))),s("div",{class:"container",ref:e=>{this.container=e},onClick:e=>this.toggleBookedCssClass(e)},s("div",{class:"screen"},s("ul",{class:"ticketsSummary",ref:e=>this.screen=e})),this.seatPositionElement()),s("p",{class:"text"},"You Select ",s("span",{id:"count"}," ",this.count)," seats for the TOTAL price of",s("span",{id:"total"}," ",this.total," "),"$"),s("div",null,s("button",{id:"cancel",class:" button error",onClick:this.cancelBtnHandler.bind(this)},"Cancel"),s("button",{id:"confirm",class:"button success",onClick:this.confirmBtnHandler.bind(this)},"Confirm"))]}static get watchers(){return{rows:["seatPositionElement"],columns:["seatPositionElement"]}}};o.style="@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');*{-webkit-box-sizing:border-box;box-sizing:border-box;}:host{--background-color:#242333;--seat-reserved-color:whitesmoke;--seat-booked-color:#6feaf6;--show-case-bg-color:rgba(0, 0, 0, 0.1);--screen-bg-color:rgb(205 203 203);--cancel-btn-color:rgb(201 79 79);--confirm-btn-color:rgb(28, 184, 65);background-color:var(--background-color, lightgrey);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;color:white;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;min-height:100vh;font-family:'lato', 'sans-serif';margin:0}.movie-container{margin:20px 0}.movie-container select{background:var(--seat-reserved-color, white);border:0;border-radius:5px;font-size:14px;margin-left:10px;padding:5px 15px;-moz-appearance:none;-webkit-appearance:none;appearance:none}.container{-webkit-perspective:800px;perspective:800px;margin-bottom:30px}.seat{background:#444451;height:12px;width:15px;margin:3px;border-top-left-radius:10px;border-top-right-radius:10px}.seat.booked{background:var(--seat-booked-color, lightblue)}.seat.reserved{background:white}.seat:nth-of-type(2){margin-right:18px}.seat:nth-last-of-type(2){margin-left:18px}.seat:not(.reserved):hover{cursor:pointer;-webkit-transform:scale(1.3);transform:scale(1.3)}.showcase .seat:not(.reserved):hover{cursor:default;-webkit-transform:scale(1);transform:scale(1)}.showcase{background:var(--show-case-bg-color, darkgrey);padding:5px 10px;border-radius:5px;color:#777;list-style-type:none;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.showcase li{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin:0px 10px}.showcase li small{margin-left:5px}.screen{background:var(--screen-bg-color, lightgrey);height:170px;width:100%;margin:15px 0;-webkit-transform:rotateX(-60deg);transform:rotateX(-60deg);-webkit-box-shadow:0 3px 10px rgba(255, 255, 255, 0.7);box-shadow:0 3px 10px rgba(255, 255, 255, 0.7)}p.text{margin:5px o}p.text span{color:#6feaf6}.row{display:-ms-flexbox;display:flex}.ticketsSummary{margin-top:2px;padding:2px 10px;}.screen li{color:black;border-left:1px solid red;list-style-type:none;padding:8px 0px;padding-left:10px;font-size:x-small}.screen li:last-child{color:red;font-style:oblique;-moz-text-align-last:end;text-align-last:end;text-decoration:underline;font-size:smaller}.button{border-radius:4px;text-shadow:0 1px 1px rgba(0, 0, 0, 0.12)}.button:hover{cursor:pointer}.button.success{background:var(--confirm-btn-color, lightgreen)}.button.error{background:var(--cancel-btn-color, red)}";export{o as raha_ticket_booking}