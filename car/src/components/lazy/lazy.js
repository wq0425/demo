//懒加载
export let lazyload = {
    node: [],
    inView(el) {
        let rect = el.getBoundingClientRect();
        return (rect.top > 0 && rect.top && rect.left > 0) <= window.innerHeight;
    },
    init() {
        this.node = document.querySelectorAll("[data-src]");
        this.loadImg();
    },
    loadImg() {
        this.node.forEach((item, index) => {
            if (this.inView(item)) {
                let data_src = item.getAttribute("data-src");
               if (item.src != data_src) {
                   item.src = data_src;
               }
            }
        })
        
    }
}
//节流，每ms时间段一定会执行一次
export let throttle = (fun, ms) => {
    let first = + new Date();
    return () => {
        let last = + new Date();
        if (last - first > ms) {
            fun();
            first = last;
        }
        
    }
    //console.log(first);
} 
//防抖动，直到时间大于ms秒后才会执行一次
export let shake = (fun, ms) => {
    let timer = 0;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fun();
        }, ms);
    }
    
}