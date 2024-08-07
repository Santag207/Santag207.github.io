function initializeSpline() {
    const canvas = document.getElementById('canvas3d');
    if (canvas) {
        const app = new window.Spline.Application(canvas);
        app.load('https://prod.spline.design/R66pP8fFpIYgIHF6/scene.splinecode');
    }
}
