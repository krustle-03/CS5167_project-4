<script>
    import shatterSound from '$lib/assets/shatter.wav'
    import { streakStore } from '$lib/stores.js';

    let { streak } = $props();

    let isShattered = $state(false);
    let animationComplete = $state(false);
    let prevLength = $state(0);

    function breakStreak() {
        const audio = new Audio(shatterSound);
        audio.play().catch(e => console.log('Audio play failed:', e));
        
        isShattered = true;
        prevLength = streak.length;
        
        // Update the store
        streakStore.break(streak.id);
        
        // Reset after animation completes
        setTimeout(() => {
            isShattered = false;
            animationComplete = false;
        }, 3000);

        // Show dialog offering encouragement

    }
</script>


<div class="container" style="position: relative;">
    <!-- Original card (always visible) -->
    <div class="card h-100 original-card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{streak.title}</h5>
            <p class="card-text">🔥 {streak.length} days clean!</p>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <button class="btn btn-danger" onclick={breakStreak} disabled={isShattered}>Break</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <small class="text-muted">broken {streak.broken} times</small>
        </div>
    </div>

    <!-- Shattered fragments (only visible during animation) -->
    {#if isShattered}
        {#each Array(12) as _, i}
            <div class="card-fragment fragment-{i}" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{streak.title}</h5>
                    <p class="card-text">🔥 {prevLength} days clean!</p>
                    <button class="btn btn-danger" disabled>Break</button>
                </div>
                <div class="card-footer">
                    <small class="text-muted">broken {streak.broken-1} times</small>
                </div>
            </div>
        {/each}
    {/if}
</div>


<style>
.streak-container {
    position: relative;
    width: 18rem;
    height: 100%;
}

.original-card {
    position: relative;
    z-index: 1;
}

.card-fragment {
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 0.25rem;
    overflow: hidden;
    animation: shatter 1s ease-out forwards;
    z-index: 2;
}

/* Create different clip paths for each fragment */
.fragment-0 { clip-path: polygon(0% 0%, 33% 0%, 25% 33%, 0% 25%); }
.fragment-1 { clip-path: polygon(33% 0%, 66% 0%, 75% 25%, 25% 33%); }
.fragment-2 { clip-path: polygon(66% 0%, 100% 0%, 100% 25%, 75% 25%); }
.fragment-3 { clip-path: polygon(100% 25%, 100% 50%, 75% 60%, 75% 25%); }
.fragment-4 { clip-path: polygon(100% 50%, 100% 75%, 80% 85%, 75% 60%); }
.fragment-5 { clip-path: polygon(100% 75%, 100% 100%, 66% 100%, 80% 85%); }
.fragment-6 { clip-path: polygon(66% 100%, 33% 100%, 40% 80%, 80% 85%); }
.fragment-7 { clip-path: polygon(33% 100%, 0% 100%, 0% 75%, 40% 80%); }
.fragment-8 { clip-path: polygon(0% 75%, 0% 50%, 20% 60%, 40% 80%); }
.fragment-9 { clip-path: polygon(0% 50%, 0% 25%, 25% 33%, 20% 60%); }
.fragment-10 { clip-path: polygon(25% 33%, 75% 25%, 75% 60%, 20% 60%); }
.fragment-11 { clip-path: polygon(75% 60%, 80% 85%, 40% 80%, 20% 60%); }

@keyframes shatter {
    0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

/* Individual fragment animations */
.fragment-0 { animation-name: shatter-0; }
.fragment-1 { animation-name: shatter-1; }
.fragment-2 { animation-name: shatter-2; }
.fragment-3 { animation-name: shatter-3; }
.fragment-4 { animation-name: shatter-4; }
.fragment-5 { animation-name: shatter-5; }
.fragment-6 { animation-name: shatter-6; }
.fragment-7 { animation-name: shatter-7; }
.fragment-8 { animation-name: shatter-8; }
.fragment-9 { animation-name: shatter-9; }
.fragment-10 { animation-name: shatter-10; }
.fragment-11 { animation-name: shatter-11; }

@keyframes shatter-0 { 100% { transform: translate(-150px, -100px) rotate(-45deg); opacity: 0; } }
@keyframes shatter-1 { 100% { transform: translate(0px, -120px) rotate(15deg); opacity: 0; } }
@keyframes shatter-2 { 100% { transform: translate(150px, -80px) rotate(45deg); opacity: 0; } }
@keyframes shatter-3 { 100% { transform: translate(180px, 0px) rotate(30deg); opacity: 0; } }
@keyframes shatter-4 { 100% { transform: translate(160px, 100px) rotate(-30deg); opacity: 0; } }
@keyframes shatter-5 { 100% { transform: translate(120px, 150px) rotate(60deg); opacity: 0; } }
@keyframes shatter-6 { 100% { transform: translate(0px, 180px) rotate(-15deg); opacity: 0; } }
@keyframes shatter-7 { 100% { transform: translate(-120px, 150px) rotate(-60deg); opacity: 0; } }
@keyframes shatter-8 { 100% { transform: translate(-160px, 100px) rotate(30deg); opacity: 0; } }
@keyframes shatter-9 { 100% { transform: translate(-180px, 0px) rotate(-30deg); opacity: 0; } }
@keyframes shatter-10 { 100% { transform: translate(-50px, -50px) rotate(90deg); opacity: 0; } }
@keyframes shatter-11 { 100% { transform: translate(50px, 50px) rotate(-90deg); opacity: 0; } }

/*Usage of hover TBD*/
.hover-effect:hover {
    border-color: blue;
    transition:cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s
}
</style>