<script>
    import Streak from "$lib/components/Streak.svelte";
    import Goal from "$lib/components/Goal.svelte";
    import NewCard from "$lib/components/New-card.svelte";
    import { streaks, goals, streakStore } from "$lib/stores.js";

    function incrementStreaks() {
        $streaks.forEach(streak => {
            streakStore.increment(streak.id)
            console.log("Incremented streak, \"", streak.title, "\"")
        });
    }

</script>

<div class="container">
    <div class="row align-items-center mb-4">
        <div class="col-auto">
            <h1>Welcome to Test Page</h1>
        </div>
        <div class="col-auto">
            <button class="btn btn-secondary" onclick={incrementStreaks}>
                <i class="bi bi-plus-circle"></i> Increment All Streaks
            </button>
        </div>
    </div>
</div>

<div class="container">
    
    <div class="row justify-content-center">
        <div class="col-auto">
            <h2>Active Streaks:</h2>
        </div>
    </div>
    
    <div class="row justify-content-center align-items-stretch mb-4">
        
        {#each $streaks as streak (streak.id)}
            <div class="col-auto d-flex mb-4">
                <Streak {streak} />
            </div>
        {/each}
        
        <div class="col-auto mb-4">
            <NewCard cardType={0} />
        </div>
        
    </div>

    <div class="row justify-content-center mt-4">
        <div class="col-auto">
            <h2>Active Goals:</h2>
        </div>
    </div>
    
    <div class="row justify-content-center">
        
        {#each $goals as goal (goal.id)}
            <div class="col-auto d-flex mb-4">
                <Goal {goal} />
            </div>
        {/each}
        
        <div class="col-auto mb-4">
            <NewCard cardType={1} />
        </div>
        
    </div>
</div>