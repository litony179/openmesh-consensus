export const clearElementsOn = (divId: string) => {
  const targetDiv = document.getElementById(divId);

  if (targetDiv) {
    targetDiv.innerHTML = '';
  } else {
    console.error(`Element with id '${divId}' not found.`);
  }
}
