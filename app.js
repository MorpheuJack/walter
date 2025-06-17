particlesJS("particles-js", {
  particles: {
    number: {
      value: 60, // Número de partículas. Menos é mais minimalista.
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#cccccc", // Cor das partículas
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
      random: true,
    },
    size: {
      value: 3,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#cccccc", // Cor das linhas
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1, // Velocidade do movimento. Mantenha baixo.
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab", // Efeito ao passar o mouse
      },
      onclick: {
        enable: false, // Desativado para não ser distrativo
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_opacity: 1,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  retina_detect: true,
});