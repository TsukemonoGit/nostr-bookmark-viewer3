<script lang="ts">
    import { tabSet, tags ,bkm } from "$lib/store";
    import { modalStore, LightSwitch, ListBox, ListBoxItem } from "@skeletonlabs/skeleton";


    // Props
    /** Exposes parent props to this component. */
    export let parent: any;
    // Local
    let res= { tag: '', bkmk: '' } ;
    
  
    let selectTag= $tags[$tabSet];
    //$: moveList = $tags.filter((item) => item !== $tags[$tabSet]);
    // Handle Form Submission
    function onFormSubmit(): void {
    
        res.tag=selectTag;
        if ($modalStore[0].response) {
            $modalStore[0].response(res);
        }
        console.log(res);
        modalStore.close();
    }

    // Base Classes
    const cBase = "card p-4 w-modal shadow-xl space-y-4 break-all";
    const cHeader = "text-2xl font-bold";

    

  
function onChange(list :string){
    console.log(list)
    console.log(selectTag);
    console.log($bkm);
    console.log($tags[$tabSet]);
}

</script>

<!-- @component This example creates a simple form modal. -->
<LightSwitch />
{#if $modalStore[0]}
    <div class="modal-example-form {cBase}">
        <header class={cHeader}>
            {$modalStore[0].title ?? "(title missing)"}
        </header>
        <article>{$modalStore[0].body ?? "(body missing)"}</article>
      
     
        <ListBox class="border border-surface-500 p-4 rounded-container-token">
			{#each   $tags as  list }
                
            
            <ListBoxItem bind:group={selectTag} name={list} value={list} on:change={()=>onChange(list)}>{list}</ListBoxItem>
            {/each}
		
		</ListBox> 
        <!-- prettier-ignore -->
       <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
      {#if selectTag !==$tags[$tabSet] || $bkm!=="pvt"} 
        <button class="btn variant-filled-warning" on:click={()=>{res.bkmk='pvt';onFormSubmit()}}>Private</button>
        {/if}
        {#if selectTag!==$tags[$tabSet] || $bkm!=="pub"} 
        <button class="btn variant-filled-primary" on:click={()=> {res.bkmk='pub';onFormSubmit()}}>Public</button>
        {/if}
    </footer>
    </div>
{/if}
