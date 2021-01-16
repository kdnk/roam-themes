// https://gist.githubusercontent.com/dkapila/7936a30a06b3b3982d2fe85ddf31ba0d/raw/a02cd64ad318d36a87923ff3f7f8666a9d0128e7/roam_back_forward_navigation.js
// Fix for electron app

setTimeout(() => {
  // Don't show navigation controls on mobile
  if (/Android|iPhone/i.test(navigator.userAgent)) {
    return;
  }

  // Only show navigation controls when using Roam in app mode
  const navigation_controls = document.createElement("div");
  navigation_controls.id = "roam-navigation-controls";
  navigation_controls.style.display = "block";
  navigation_controls.setAttribute(
    "style",
    "display: block; left: 2px !important; width: 35px; max-width: 35px!important; top: 40px; position: relative; z-index: 100000;"
  );

  const navigation_controls_back = document.createElement("i");
  navigation_controls_back.id = "roam-navigation-controls_back";
  navigation_controls_back.style.display = "block";
  navigation_controls_back.setAttribute(
    "style",
    "margin-bottom:2px;border: solid var(--icons);border-width: 0 3px 3px 0;display: inline-block;position: relative;padding: 5px;transform: rotate(135deg);-webkit-transform: rotate(135deg);cursor: pointer;"
  );
  navigation_controls_back.onclick = () => {
    window.history.back();
  };
  navigation_controls_back.title = "Go back";

  const navigation_controls_forward = document.createElement("i");
  navigation_controls_forward.id = "roam-navigation-controls_forward";
  navigation_controls_forward.style.display = "block";
  navigation_controls_forward.setAttribute(
    "style",
    "margin-bottom:2px;border: solid var(--icons);border-width: 0 3px 3px 0;display: inline-block;position: relative;padding: 5px;transform: rotate(-45deg);-webkit-transform: rotate(-45deg);cursor: pointer;"
  );
  navigation_controls_forward.onclick = () => {
    window.history.forward();
  };

  navigation_controls_forward.title = "Go forward";

  const toolbar_container = document.querySelector(".roam-topbar");
  const toolbar_container_flex_box = toolbar_container.querySelector(
    ".flex-h-box"
  );

  toolbar_container_flex_box.prepend(navigation_controls);

  document
    .getElementById("roam-navigation-controls")
    .appendChild(navigation_controls_back);
  document
    .getElementById("roam-navigation-controls")
    .appendChild(navigation_controls_forward);

  const add_sidebar_state_class_to_navigation_controls = () => {
    const update_navigation_bar_class = (on_first_load = false) => {
      var nextSibblingTag = navigation_controls.nextSibling.tagName;
      if (on_first_load) {
        navigation_controls.className =
          nextSibblingTag == "SPAN"
            ? "left-sidebar-closed"
            : "left-sidebar-open";
      } else {
        navigation_controls.className =
          nextSibblingTag == "SPAN"
            ? "left-sidebar-open"
            : "left-sidebar-closed";
      }
    };

    const roamSidebarContainerFlex = document.querySelector(
      ".roam-sidebar-container .flex-v-box .flex-h-box"
    );
    roamSidebarContainerFlex.addEventListener(
      "DOMNodeRemoved",
      function (event) {
        update_navigation_bar_class();
      },
      false
    );

    roamSidebarContainerFlex.addEventListener(
      "DOMNodeInserted",
      function (event) {
        update_navigation_bar_class();
      },
      false
    );

    update_navigation_bar_class(true);
  };

  add_sidebar_state_class_to_navigation_controls();
}, 0);
