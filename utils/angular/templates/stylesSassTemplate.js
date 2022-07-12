const stylesCssText = () => {
    return `/* You can add global styles to this file, and also import other style files */
@import "variables_custom";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
.container-body{
    margin-top: 75px;
}

@each $color, $value in $theme-colors {
    .btn-#{$color} {
        color: color-yiq($value) !important;
    }
}`;
};

module.exports = stylesCssText;
