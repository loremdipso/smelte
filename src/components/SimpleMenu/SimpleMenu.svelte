<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { fly } from "svelte/transition";
	import { quadOut, quadIn } from "svelte/easing";
	import List from "../List";
	import TextField from "../TextField";
	import { ClassBuilder } from "../../utils/classes.js";

	const classesDefault = "cursor-pointer relative";
	const listClassesDefault =
		"absolute w-auto top-10 bg-white right-0 p-2 bg-white rounded shadow z-20 dark:bg-dark-500 whitespace-nowrap";

	export let items = [];
	export let open = false;
	export let value = null;
	export let classes = classesDefault;
	export let listClasses = listClassesDefault;
	export let listProps = {};

	const cb = new ClassBuilder($$props.class);

	$: c = cb
		.flush()
		.add(classes, true, classesDefault)
		.add($$props.class)
		.get();

	const lcb = new ClassBuilder(listClasses, listClassesDefault);

	$: l = lcb.flush().get();

	const dispatch = createEventDispatcher();

	const inProps = { y: 10, duration: 200, easing: quadIn };
	const outProps = { y: -10, duration: 100, easing: quadOut, delay: 100 };
</script>

<svelte:window on:click={() => (open = false)} />

<div class={c} on:click|stopPropagation>
	<slot name="activator" />
	{#if open}
		<div class={l} in:fly={inProps} out:fly={outProps}>
			<slot name="menu" />
		</div>
	{/if}
</div>
