(function() {
    const output = [];

    output.push(`---------------------------------------------------------`);
    output.push(`Current Time: ${new Date()}`);
    for (var prop in performance.memory) {
        output.push(`${prop} : ${Math.ceil(performance.memory[prop]/(1024*1024))} MB`);
    }
    output.push(`---------------------------------------------------------`);

    output.push('Engagements');
    const engagements = Ember.Application.NAMESPACES[0].__container__.lookup('service:api').get('agent.engagements');    
    engagements.forEach(engagement => {
       const { id, startTime, messages } = engagement;

       output.push(`  engagement id: ${id}`);
       output.push(`  engagement startTime: ${startTime} (${new Date(startTime)})`);
       output.push('');
       output.push('    Messages');
       messages.forEach(message => {
          const { engagement: messageEngagement, __data__ } = message;
          output.push(`      message belongs to engagement: ${messageEngagement.id}`);
          Object.entries(__data__).forEach(keyValuePair => {
              output.push(`      ${keyValuePair.join(': ')}`);
          });
          output.push('');
       });
       output.push('');
    });
    const scrollRenderComponent = document.querySelector('.active-engagement-container .nuance-scroll-render');
    const scrollRenderInstance = Ember.Application.NAMESPACES[0].__container__.lookup('-view-registry:main')[scrollRenderComponent.id];
    const itemsToRender = scrollRenderInstance.itemsToRender;

    output.push('Scroll Render\'s Items to Render');
    itemsToRender.forEach(message => {
        const { engagement: { id: engagementId }, __data__ } = message;
        output.push(`  engagement id: ${engagementId}`);
        Object.entries(__data__).forEach(keyValuePair => {
            output.push(`  ${keyValuePair.join(': ')}`);
        });
        output.push('');
    });
    console.log(output.join(`
`));
})();