<script>
    import { goalStore } from '$lib/stores.js'
    import MotivationalModal from './Motivational-modal.svelte';

    let { goal } = $props();

    let isShattered = $state(false);
    let animationComplete = $state(false);
    let isEditing = $state(false);
    let editTitle = $state('');
    // Add editing states for update functionality
    let isUpdating = $state(false);
    let editTargetDays = $state(0);
    let editMaxStrikes = $state(0);
    let editDescription = $state('');
    let showModal = $state(false);

    // Calculate remaining days
    let daysRemaining = $derived(goal.targetDays - goal.daysCompleted);
    
    // Check if goal period is active
    let isPeriodActive = $derived(!goal.completed && daysRemaining > 0);
    
    // Check if goal is at risk (2 strikes)
    let isAtRisk = $derived(goal.strikes === goal.maxStrikes-1);


    $effect(() => {
        if (goal.isUpdating) {
            isUpdating = true;
            editTargetDays = goal.targetDays;
            editMaxStrikes = goal.maxStrikes;
            editDescription = goal.description;
            // Clear the isUpdating flag from the store
            goalStore.clearUpdatingFlag(goal.id);
        }
    });

    function failGoal() {
        
        if ((goal.strikes + 1) >= goal.maxStrikes){
            // Play shatter animation
            isShattered = true;
            
            // Add strike through store
            
            // Reset animation after it completes
            setTimeout(() => {
                isShattered = false;
                animationComplete = false;
                // Show dialog offering encouragement
                showModal = true;
            }, 1000);
            }
        goalStore.addStrike(goal.id);
    }

    function deleteGoal() {
        goalStore.remove(goal.id);
    }

    function startRename() {
        isEditing = true;
        editTitle = goal.title;
    }

    function saveTitle() {
        if (editTitle.trim() !== '') {
            goalStore.rename(goal.id, editTitle.trim());
        }
        isEditing = false;
    }

    function handleKeydown(event) {
        if (event.key === 'Enter') {
            saveTitle();
        } else if (event.key === 'Escape') {
            isEditing = false;
        }
    }

    // New functions for update functionality
    function startUpdate() {
        isUpdating = true;
        editTargetDays = goal.targetDays;
        editMaxStrikes = goal.maxStrikes;
        editDescription = goal.description;
    }

    function saveUpdate() {
        if (editTargetDays > 0 && editMaxStrikes > 0 && editDescription.trim() !== '') {
            goalStore.updateGoal(goal.id, {
                targetDays: editTargetDays,
                maxStrikes: editMaxStrikes,
                description: editDescription.trim()
            });
        }
        isUpdating = false;
    }

    function cancelUpdate() {
        isUpdating = false;
    }

    function handleUpdateKeydown(event) {
        if (event.key === 'Enter' && event.ctrlKey) {
            saveUpdate();
        } else if (event.key === 'Escape') {
            cancelUpdate();
        }
    }
</script>


<!-- Only create modal when needed -->
{#if showModal}
    <MotivationalModal bind:isOpen={showModal} />
{/if}

<div class="card-container">
    <!-- Original card -->
    <div class="card h-100 original-card" class:border-warning={isAtRisk} class:border-success={goal.completed}>
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-2">
                {#if isEditing}
                    <!-- uses autofocus because the edit should be cancelled if focus is lost -->
                    <input 
                        type="text" 
                        class="form-control form-control-sm"
                        bind:value={editTitle}
                        onblur={saveTitle}
                        onkeydown={handleKeydown}
                        autofocus
                    />
                {:else}
                    <h5 class="card-title mb-0">{goal.title}</h5>
                    <div class="d-flex gap-1">
                        <button 
                            class="btn btn-outline-secondary btn-sm"
                            onclick={startRename}
                            disabled={isShattered || isUpdating}
                            aria-label="Rename Goal"
                        >
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button 
                            class="btn btn-outline-danger btn-sm"
                            onclick={deleteGoal}
                            disabled={isShattered || isUpdating}
                            aria-label="Remove Goal"
                        >
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                {/if}
            </div>

            {#if isUpdating}
                <!-- Update form -->
                <div class="mb-3">
                    <div class="mb-2">
                        <label class="form-label small">Description:</label>
                        <textarea 
                            class="form-control form-control-sm"
                            bind:value={editDescription}
                            onkeydown={handleUpdateKeydown}
                            rows="2"
                        ></textarea>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label class="form-label small">Target Days:</label>
                            <input 
                                type="number" 
                                class="form-control form-control-sm"
                                bind:value={editTargetDays}
                                min="1"
                                onkeydown={handleUpdateKeydown}
                            />
                        </div>
                        <div class="col-6">
                            <label class="form-label small">Max Strikes:</label>
                            <input 
                                type="number" 
                                class="form-control form-control-sm"
                                bind:value={editMaxStrikes}
                                min="1"
                                max="5"
                                onkeydown={handleUpdateKeydown}
                            />
                        </div>
                    </div>
                    <div class="mt-2">
                        <small class="text-muted">Press Ctrl+Enter to save, Escape to cancel</small>
                    </div>
                </div>
            {:else}
                <p class="card-text">{goal.description}</p>
            {/if}
            
            <!-- Goal Progress Display -->
            <div class="mb-3">
                <!-- Progress bar with number on right -->
                <div class="mb-2">
                    <small class="text-muted">Progress:</small>
                    <div class="d-flex align-items-center gap-2 mt-1">
                        <div class="progress flex-grow-1" style="height: 8px;">
                            <div 
                                class="progress-bar {goal.completed ? 'bg-success' : 'bg-primary'}" 
                                style="width: {(goal.daysCompleted / goal.targetDays) * 100}%"
                            ></div>
                        </div>
                        <div class="fw-bold {daysRemaining <= 2 && daysRemaining > 0 ? 'text-warning' : goal.completed ? 'text-success' : 'text-primary'}" style="min-width: 50px;">
                            {goal.daysCompleted}/{goal.targetDays}
                        </div>
                    </div>
                </div>
                
                <!-- Strike indicators with number on right -->
                <div>
                    <small class="text-muted">Strikes:</small>
                    <div class="d-flex align-items-center gap-2 mt-1">
                        <div class="d-flex gap-1">
                            {#each Array(goal.maxStrikes) as _, i}
                                <div class="strike-indicator {i < goal.strikes ? 'strike-filled' : 'strike-empty'}"></div>
                            {/each}
                        </div>
                        <div class="fw-bold {isAtRisk ? 'text-danger' : 'text-secondary'}" style="min-width: 30px;">
                            {goal.strikes}/{goal.maxStrikes}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="row d-flex">
                <div class="col">
                    {#if goal.completed}
                        {#if isUpdating}
                            <div class="d-flex gap-1">
                                <button 
                                    class="btn btn-success flex-grow-1"
                                    onclick={saveUpdate}
                                >
                                    Save
                                </button>
                                <button 
                                    class="btn btn-secondary"
                                    onclick={cancelUpdate}
                                >
                                    Cancel
                                </button>
                            </div>
                        {:else}
                            <button 
                                class="btn btn-success w-100"
                                onclick={startUpdate}
                                disabled={isShattered}
                            >
                                Update
                            </button>
                        {/if}
                    {:else}
                        <button 
                            class="btn btn-danger w-100" 
                            onclick={failGoal} 
                            disabled={isShattered || goal.completed}
                        >
                            Strike
                        </button>
                    {/if}
                </div>
            </div>
        </div>
        
        <div class="card-footer">
            <small class="text-muted">
                Failed {goal.broken} time{goal.broken !== 1 ? 's' : ''}
                {#if isPeriodActive}
                    • {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
                {/if}
            </small>
        </div>
    </div>

    <!-- Shattered fragments -->
    {#if isShattered}
        {#each Array(12) as _, i}
            <div class="card-fragment fragment-{i}">
                <!-- Fragment content same as original -->
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <h5 class="card-title mb-0">{goal.title}</h5>
                        <div class="d-flex gap-1">
                            <button class="btn btn-outline-secondary btn-sm" aria-label="Rename Goal" disabled>
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button class="btn btn-outline-danger btn-sm" aria-label="Remove Goal" disabled>
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                    <p class="card-text">{goal.description}</p>
                    <button class="btn btn-danger" disabled>Add Strike</button>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Failed {goal.broken} times</small>
                </div>
            </div>
        {/each}
    {/if}
</div>

<style>
.card-container {
    position: relative;
    /* Remove fixed width, let it be flexible */
    min-width: 250px; /* Set a minimum width */
    max-width: 400px; /* Optional: set a maximum width */
    height: 100%;
    display: inline-block; /* Allow natural width sizing */
}

.original-card {
    position: relative;
    z-index: 1;
    width: 100%; /* Take full width of container */
}

.card-fragment {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; /* Match the container width */
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

.strike-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #dc3545;
}

.strike-filled {
    background-color: #dc3545;
}

.strike-empty {
    background-color: transparent;
}

/* Border colors for different states */
.border-warning {
    border-color: #ffc107 !important;
    border-width: 2px !important;
}

.border-success {
    border-color: #198754 !important;
    border-width: 2px !important;
}
</style>