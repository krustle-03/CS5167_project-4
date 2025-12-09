<script>
    import Streak from "$lib/components/Streak.svelte";
    import Goal from "$lib/components/Goal.svelte";
    import NewCard from "$lib/components/New-card.svelte";
    import { streaks, goals } from "$lib/stores.js";
</script>

<h1>Welcome to Test Page</h1>

<div class="container">
    
    <div class="row justify-content-center">
        <div class="col-auto">
            <h2>Active Streaks:</h2>
        </div>
    </div>
    
    <div class="row justify-content-center align-items-stretch mb-4">
        
        {#each $streaks as streak (streak.id)}
            <div class="col-auto d-flex">
                <Streak {streak} />
            </div>
        {/each}
        
        <div class="col-auto">
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
            <div class="col-auto">
                <Goal {goal} />
            </div>
        {/each}
        
        <div class="col-auto">
            <NewCard cardType={1} />
        </div>
        
    </div>
</div>