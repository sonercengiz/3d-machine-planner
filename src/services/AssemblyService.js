// src/services/assemblyService.js
export async function saveAssembly(models) {
    // Burada models dizisini JSON'a çevirip kaydedeceğiz (mock).
    // Gerçekte bir backend'e POST atabilir veya sunucuya yazdırabilirsin.

    const assemblyData = {
        timestamp: new Date().toISOString(),
        models: models.map(({ id, path, position }) => ({
            id,
            path,
            position,
        })),
    };

    // Şu anda "dosyaya yazıyormuş" gibi sadece konsola basalım.
    console.log(">>> [saveAssembly] assemblyData:", assemblyData);

    // Eğer bu veriyi bir backend'e gönderiyorsan:
    await fetch('http://localhost:3001/assemblies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assemblyData)
    });
}

export async function loadAssembly() {
    // assembly.json içeriğini okumayı deniyoruz (mock).
    // Aslında tarayıcıda /assembly.json varsa GET ile çekmeye çalışabilirsin.
    try {
        const response = await fetch("/http://localhost:3001/assemblies/1");
        if (!response.ok) throw new Error("assembly.json bulunamadı");
        const data = await response.json();
        console.log(">>> [loadAssembly] data:", data);
        return data; // { timestamp, models: [...] }
    } catch (error) {
        console.error(">>> [loadAssembly] hata:", error);
        return null;
    }
}
