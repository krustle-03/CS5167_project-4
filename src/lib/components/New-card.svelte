<script>
    import { streakStore, goalStore } from '$lib/stores.js';
    
    let { cardType = 0 } = $props(); // 0 for streak, 1 for goal
    
    const cardTypes = ['streak', 'goal'];
    
    function createNew() {
        console.log('Creating new:', cardTypes[cardType], 'cardType:', cardType);
        
        if (cardType === 0) {
            // Create new streak in editing mode
            streakStore.add({
                title: `New Streak`,
                isEditing: true
            });
            console.log('New streak created')
        } else if (cardType === 1) {
            // Create new goal in updating mode
            goalStore.add({
                title: `New Goal`,
                description: 'New goal description',
                isUpdating: true
            });
            console.log('New goal created')
        } else {
            console.log('Creation unsuccessful - invalid cardType:', cardType)
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
                    aria-label="Create New Card"
                >
                    <i class="bi bi-plus-circle" style="font-size: 3rem;"></i>
                </button>
            </div>
        </div>
    </div>
</div>