class Transition{static instances=[];static load(t=!1){var i,e;t?(i=t.getAttribute("data-transition-container"),Transition.instances[i]=new Transition(t)):(e=[...document.querySelectorAll("[data-transition-container]")],Transition.instances=e.map(t=>new Transition(t)))}static reload(i){Transition.instances.forEach(t=>i===t.name&&t.initItems())}static reset(i){Transition.instances.forEach(t=>{i===t.name&&t.items.forEach(t=>t.setAttribute("data-transition-active",!1))})}constructor(t){this.container=t,this.name=this.container.getAttribute("data-transition-container"),""!==this.name&&(this.initItems(),this.itemsListener())}initItems(){this.cascade=this.container.getAttribute("data-transition-cascade"),"horizontal"===this.cascade&&(this.column_counter=0),this.interval=parseInt(this.container.getAttribute("data-transition-cascade-interval")),this.reset=null!==this.container.getAttribute("data-transition-reset"),this.trigger=this.container.getAttribute("data-transition-trigger"),this.items=this.findItems(),this.items.forEach((t,i)=>this.configureItem(t,i))}findItems(){return[...document.querySelectorAll(`[data-transition-item="${this.name}"]`)].filter(t=>!("small"===theme.mqs.current_window&&"medium-large"===t.dataset.mq||"small"!==theme.mqs.current_window&&"small"===t.dataset.mq))}configureItem(t,i){var e,s=t.getAttribute("data-transition-cascade"),n=s||this.cascade,a=t.getAttribute("data-transition-cascade-interval"),r=a?parseInt(a):this.interval,o=t.getAttribute("data-transition-trigger"),c=o||this.trigger;n&&this.addItemCascade(i,n,r),null!==c&&isNaN(parseInt(c))||(e=null!==this.items[i].getAttribute("data-transition-reset")||this.reset,this.addItemObserver(i,e,null===c?.4:parseInt(c)/100))}addItemCascade(t,i,e){var s,n,a=null!==this.items[t].getAttribute("data-transition-cropper")?this.items[t].children[0]:this.items[t];"horizontal"===i?(s=this.items[t].offsetTop,n=0<t?this.items[t-1].offsetTop:s,this.column_counter=0<t&&s===n?this.column_counter+1:0,a.style.transitionDelay=this.column_counter*e+"ms"):"vertical"===i&&(a.style.transitionDelay=t*e+"ms")}addItemObserver(t,e,i){new IntersectionObserver(([{target:t,isIntersecting:i}])=>{i&&"vertical"===this.cascade?this.items.forEach(t=>{t.setAttribute("data-transition-active",!0),t.on("transitionend",()=>t.setAttribute("data-transition-finished",!0),{once:!0})}):i?(t.setAttribute("data-transition-active",!0),t.on("transitionend",()=>t.setAttribute("data-transition-finished",!0),{once:!0})):e&&(t.setAttribute("data-transition-active",!1),t.on("transitionend",()=>t.setAttribute("data-transition-finished",!1),{once:!0}))},{threshold:i}).observe(this.items[t])}itemsListener(){window.on("theme:mqs:updated",()=>this.initItems())}}theme.transitions=Transition,theme.transitions.load();