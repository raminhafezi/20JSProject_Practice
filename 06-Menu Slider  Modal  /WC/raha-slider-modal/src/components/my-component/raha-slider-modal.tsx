import { Component, h, Prop, Watch, State } from '@stencil/core';

@Component({
  tag: 'raha-slider-modal',
  styleUrl: 'raha-slider-modal.css',
  shadow: true,
})
export class MyComponent {
  bodyEl: HTMLBodyElement;
  toggleBtn: HTMLButtonElement;
  @Prop() links: string;
  @State() SliderLinks: Object[];

  defaultNavItems = [
    { name: 'Your Home', link: 'https://Googooli.mogoli.com' },
    { name: 'Your Portfolio', link: 'https://Googooli.mogoli.com' },
    { name: 'Your Blog', link: 'https://Googooli.mogoli.com' },
    { name: 'Your Contact', link: 'https://Googooli.mogoli.com' },
  ];

  @Prop({ mutable: true, reflect: true }) sliderPic = { src: 'https://randomuser.me/api/portraits/women/35.jpg', alt: 'user' };

  @Watch('links')
  SliderLinksWatcher(newValue: string) {
    const isBlank = typeof newValue !== 'string' || newValue === '';
    if (isBlank) {
      this.SliderLinks = this.defaultNavItems;
    } else {
      this.SliderLinks = JSON.parse(this.links);
      // console.log(typeof this.links);
    }
  }

  componentWillLoad() {
    this.SliderLinksWatcher(this.links);
  }
  showNav() {
    this.bodyEl.classList.toggle('show-nav');
    this.toggleBtn.classList.toggle('open');
  }
  sliderContent() {
    let links = [];
    console.log(this.SliderLinks);

    this.SliderLinks.forEach(item => {
      links.push(
        <li>
          <a href={item['link']}>{item['name']}</a>
        </li>,
      );
    });

    let image = <img src={this.sliderPic.src} alt={this.sliderPic.alt} />;
    return [<div class="logo">{image}</div>, <ul>{links}</ul>];
  }

  render() {
    return [
      <body ref={el => (this.bodyEl = el)}>
        <nav>{this.sliderContent()}</nav>
        <header>
          <button id="toggle" class="toggle" ref={el => (this.toggleBtn = el)} onClick={this.showNav.bind(this)}>
            ➤
          </button>
          <h1>My Landing Page</h1>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, enim.</p>

          <button class="cta-btn" id="open">
            Sign Up
          </button>
        </header>
        <div class="container">
          <h2>What is this landing page about?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem tenetur distinctio odio sequi voluptates et nulla reiciendis. Modi nulla architecto, sit, iste
            dolores hic illo pariatur dolore, blanditiis praesentium eveniet!
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quisquam aperiam rerum labore ut quae totam, dignissimos asperiores laudantium amet!</p>

          <h2>Tell Me More</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae a reprehenderit exercitationem minima fuga, at, quaerat rerum maiores dicta fugit saepe ducimus quia
            temporibus. Quaerat deleniti rem maiores similique enim quae hic voluptatem fuga illum? Voluptatibus excepturi pariatur eaque provident?
          </p>
          <h2>Benefits</h2>
          <ul>
            <li>Life Time Access</li>
            <li>30 Day Money Back</li>
            <li>Tailed Customer Support</li>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde temporibus deleniti sunt officia aperiam soluta non accusantium distinctio vel animi illo ipsum quas
              mollitia similique quae aut cupiditate, magnam eum! Consequuntur minus quasi inventore repudiandae dolorem, voluptatem accusamus rerum quod dignissimos odit impedit
              iure nihil. Enim, distinctio. Natus eaque libero amet, earum deleniti laudantium delectus alias aliquam id excepturi explicabo possimus aspernatur labore blanditiis
              saepe culpa sit beatae cupiditate voluptatibus!
            </p>
          </ul>
        </div>
        <div class="modal-container" id="modal">
          <div class="modal">
            <button class="close-btn" id="close">
              <i class="fa fa-times"></i>
            </button>
            <div class="modal-header">
              <h3>Sign Up</h3>
            </div>
            <div class="modal-content">
              <p>Register with us to get offers, support, and more</p>
              <form class="modal-form">
                <div>
                  <label id="name">Name</label>
                  <input class="form-input" type="text" id="name" placeholder="Enter Name" />
                </div>
                <div>
                  <label id="email">Email</label>
                  <input class="form-input" type="email" id="email" placeholder="Enter Email" />
                </div>
                <div>
                  <label id="password">password</label>
                  <input class="form-input" type="password" id="password" placeholder="Enter Password" />
                </div>
                <div>
                  <label id="password2">Confirm Password`</label>
                  <input class="form-input" type="password" id="password2" placeholder="Confirm Passowrd" />
                </div>
                <input type="submit" value="submit" class="submit-btn" />
              </form>
            </div>
          </div>
        </div>
      </body>,
    ];
  }
}
