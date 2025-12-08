<script>
    import { onMount } from 'svelte';
    import favicon from '$lib/assets/favicon.svg';
    import 'bootstrap/dist/css/bootstrap.min.css';

    let { children } = $props();

    // Import Bootstrap JS after component mounts (client-side only)
    onMount(async () => {
        await import('bootstrap/dist/js/bootstrap.bundle.min.js');
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<main>
    {@render children()}
</main>
