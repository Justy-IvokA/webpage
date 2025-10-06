# Crear una animación de GSAP para utilizar en React

## Contexto y Objetivo
El codigo proviene de un codepen que se llama "Grow circle to fill the screen (on scroll)".
Utiliza el siguiente codigo HTML, CSS y Javascript para crear metodos dinamicos en los componentes useGsapAnimations.ts & animation-provider.tsx que permitan reutilizar la animacion, despues crea un componente de caso de uso en el directorio /src/components.

## Comentarios adicionales
Convierte el codigo CSS a clases de Tailwind CSS.

## Código HTML, CSS y Javascript
```html
<section id="section">
  <img src="https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg" alt="">
  <p id="title">TITLE <span>?</span></p>
  <div class="dot"></div>
</section>

## Código CSS
```css
* {
  margin: 0;
  padding: 0;
}

section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

p {
  font-size: 100px;
  text-align: center;
  position: relative;
  font-weight: 900;
  color: #fff;
  opacity: 0;
  left: 200px;
}
.dot {
  background-color: white;
  width: 0;
  height: 0;
  border-radius: 50%;
  position: absolute;
}

## Código Javascript
```javascript
let section = document.getElementById('section'),
    title = document.getElementById('title'),
    mark = title.querySelector("span"),
    dot = document.querySelector(".dot");

gsap.set(dot, {
  width: "142vmax", // ensures it fills every part of the screen. 
  height: "142vmax",
  xPercent: -50, // center the dot in the section area
  yPercent: -50,
  top: "50%",
  left: "50%"
});

let tl1 = gsap.timeline({
		scrollTrigger: {
			trigger: section,
			start: "top top",
			end: "bottom top",
			markers: true,
			scrub: 1.5, 
			pin: section,
			pinSpacing: true,
      invalidateOnRefresh: true,
		},	
		defaults: { ease: "none" }
	});

tl1
  .to(title, { opacity: 1 })
  .fromTo(dot, {
      scale: 0,
      x: () => {
        let markBounds = mark.getBoundingClientRect(),
            px = markBounds.left + markBounds.width * 0.54; // dot is about 54% from the left of the bounds of the character
        return px - section.getBoundingClientRect().width / 2;
      },
      y: () => {
         let markBounds = mark.getBoundingClientRect(),
            py = markBounds.top + markBounds.height * 0.73; // dot is about 73% from the top of the bounds of the character
        return py - section.getBoundingClientRect().height / 2;
      }
   }, { 
    x: 0,
    y: 0,
    ease: "power3.in",
    scale: 1
});