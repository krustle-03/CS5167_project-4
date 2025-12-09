<script>
    import { streakStore, goalStore } from '$lib/stores.js';
    
    let { cardType = 0 } = $props(); // 0 for streak, 1 for goal
    
    const cardTypes = ['streak', 'goal'];
    
    function createNew() {
        console.log('Creating new:', cardTypes[cardType], 'cardType:', cardType); // Debug log
        
        if (cardType === 0) {
            // Create new streak
            streakStore.add({
                title: `untitled streak aaaaaaaaaaaaaaaaaa`,
            });
            console.log('streak created')
        } else if (cardType === 1) {
            // Create new goal
            goalStore.add({
                title: `untitled goal aaaaaaaaaaaaaaaaaa`,
                description: 'New goal description'
            });
            console.log('goal created')
        } else {
            console.log('unsuccessful - invalid cardType:', cardType)
        }
    }
</script>

<div class="container" style="height: 100%;">
    <div class="card h-100">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">Create new {cardTypes[cardType]}</h5>
            <div class="flex-grow-1 d-flex align-items-center justify-content-center">
                <button 
                    class="btn btn-primary d-flex align-items-center justify-content-center" 
                    style="width: 80px; height: 80px;"
                    onclick={createNew}
                >
                    <i class="bi bi-plus-circle" style="font-size: 3rem;"></i>
                </button>
            </div>
        </div>
    </div>
</div>