<script>
    import Streak from "$lib/components/Streak.svelte";
    import Goal from "$lib/components/Goal.svelte";
</script>

<h1>Welcome to Test Page</h1>


<div class="container">
    
    <div class="row justify-content-center">
        <div class="col-auto">
            <h2>Active Streaks:</h2>
        </div>
    </div>
    
    <div class="row justify-content-center">
        
        <!-- Wrap in an {each} block when the time comes. -->
        <div class="col-auto">
            <Streak/>
        </div>
        
    </div>
</div>