import { browser } from '$app/environment';

if (browser) {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
}