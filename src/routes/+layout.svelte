<script>
    import favicon from '$lib/assets/favicon.svg';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';
    import '$lib/bootstrap.js'; // This handles the client-side import

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<main>
    {@render children()}
</main>
