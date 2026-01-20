import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Code, FileText, Info } from 'lucide-react';

const GameDocumentation = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const Section = ({ id, title, children, icon: Icon }: { id: string, title: string, children: React.ReactNode, icon: any }) => (
    <div className="mb-4 border border-gray-700/50 rounded-lg overflow-hidden bg-gray-900/40 backdrop-blur hover:bg-gray-900/60 transition-all duration-300 hover:border-gray-600/50">
      <button
        onClick={() => toggleSection(id)}
        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 flex items-center justify-between hover:from-cyan-600/20 hover:to-blue-600/20 transition-all duration-200 border-b border-gray-700/30"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-100 text-lg">{title}</span>
        </div>
        <div className="transform transition-transform duration-300">
          {expandedSections[id] ? <ChevronDown className="w-5 h-5 text-cyan-400" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
        </div>
      </button>
      {expandedSections[id] && (
        <div className="p-6 bg-gray-950/50 backdrop-blur animate-in fade-in duration-300">
          {children}
        </div>
      )}
    </div>
  );

  const SyntaxHighlight = (code: string) => {
    return code
      // Keywords - Cyan
      .replace(/\b(var|const|let|function|if|else|for|while|return|import|export|class|interface|type|new|this|true|false|null|undefined)\b/g, '<span class="text-cyan-400">$1</span>')
      // Strings - Emerald
      .replace(/("[^"]*"|\'[^\']*\'|`[^`]*`)/g, '<span class="text-emerald-400">$1</span>')
      // Comments - Gray
      .replace(/\/\/[^\n]*/g, '<span class="text-gray-500">$&</span>')
      // Numbers - Orange
      .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>')
      // Booleans & Special - Yellow
      .replace(/\b(true|false)\b/g, '<span class="text-yellow-400">$1</span>')
      // Operators & Punctuation - Pink
      .replace(/([=+\-*/><&|!]+)/g, '<span class="text-pink-400">$1</span>')
      // Brackets & Parens - Purple
      .replace(/([(){}[\].,;:])/g, '<span class="text-purple-400">$1</span>')
      // Wrap in default light color for anything else
      .split('</span>').map((part, idx) => {
        if (idx === 0) return part;
        // Add default color span if part doesn't start with a span
        if (!part.startsWith('<span')) {
          return '<span class="text-gray-200">' + part + '</span></span>';
        }
        return part + '</span>';
      }).join('');
  };

  const CodeBlock = ({ code }: { code: string }) => {
    const lines = code.split('\n');
    const highlightedLines = lines.map(line => SyntaxHighlight(line));

    return (
      <div className="bg-gray-950 rounded-lg overflow-hidden my-4 border border-gray-800 shadow-2xl">
        <div className="flex">
          {/* Line numbers */}
          <div className="bg-gray-950/80 px-4 py-4 text-gray-400 text-right select-none font-mono text-sm border-r border-gray-800">
            {lines.map((_, index) => (
              <div key={index} className="leading-6 h-6">
                {index + 1}
              </div>
            ))}
          </div>
          {/* Code content */}
          <pre className="flex-1 p-4 overflow-x-auto">
            <code className="font-mono text-sm leading-6 text-gray-200">
              {highlightedLines.map((line, idx) => (
                <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </code>
          </pre>
        </div>
      </div>
    );
  };

  const ParamTable = ({ params }: { params: any[] }) => (
    <div className="overflow-x-auto my-4 rounded-lg border border-gray-700/50 shadow-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border-b border-gray-700">
            <th className="px-4 py-3 text-left font-semibold text-cyan-300">Parameter</th>
            <th className="px-4 py-3 text-left font-semibold text-cyan-300">Tipe</th>
            <th className="px-4 py-3 text-left font-semibold text-cyan-300">Default</th>
            <th className="px-4 py-3 text-left font-semibold text-cyan-300">Penjelasan</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param, idx) => (
            <tr key={idx} className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${idx % 2 === 0 ? 'bg-gray-900/20' : 'bg-gray-800/10'}`}>
              <td className="px-4 py-3 font-mono text-sm text-gray-200">{param.name}</td>
              <td className="px-4 py-3 font-mono text-sm text-orange-400">{param.type}</td>
              <td className="px-4 py-3 font-mono text-sm text-emerald-400">{param.default}</td>
              <td className="px-4 py-3 text-sm text-gray-200">{param.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-gray-900/40 text-white p-10 rounded-2xl shadow-2xl mb-8 border border-cyan-500/20 backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg">
              <Book className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Dokumentasi Game Horror 3D</h1>
          </div>
          <p className="text-gray-300 text-lg font-light mb-6">Panduan Lengkap untuk Siswa SMA - Penjelasan Baris per Baris</p>
          <div className="flex gap-3 flex-wrap">
            <span className="bg-cyan-500/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium border border-cyan-500/40 text-cyan-300">Godot Engine 4.x</span>
            <span className="bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium border border-blue-500/40 text-blue-300">GDScript</span>
            <span className="bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium border border-purple-500/40 text-purple-300">3D Game</span>
          </div>
        </div>

        {/* Pengenalan */}
        <Section id="intro" title="📘 Pengenalan Game" icon={Info}>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-300 mb-3">Tentang Game Ini</h3>
            <p className="text-gray-300 mb-4">
              Game ini adalah game horror 3D first-person di mana pemain harus melarikan diri dari monster yang mengejar. 
              Game memiliki sistem hari (lives), sistem AI monster dengan patroli dan chase, efek cahaya horror, dan transisi scene yang smooth.
            </p>
            
            <h4 className="text-lg font-semibold text-cyan-300 mt-4 mb-2">Fitur Utama:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li><strong>Sistem Lives:</strong> Pemain memiliki 3 nyawa (hari), setiap tertangkap kembali ke hari berikutnya</li>
              <li><strong>AI Monster:</strong> Monster yang bisa patroli dan mengejar pemain dengan Line of Sight detection</li>
              <li><strong>Efek Cahaya:</strong> Lampu berkedip (flicker) untuk atmosfer horror</li>
              <li><strong>Sistem Audio:</strong> Background music, ambient sound, dan sound effects</li>
              <li><strong>Transisi Scene:</strong> Animasi smooth saat pindah scene dengan fade effect</li>
              <li><strong>UI/UX:</strong> Tombol menu dengan efek blink, fade transitions, camera movement</li>
            </ul>

            <h4 className="text-lg font-semibold text-cyan-300 mt-4 mb-2">File-file Script:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-200">
              <li><code className="bg-gray-800 px-2 py-1 rounded text-emerald-400">button.gd</code> - Script untuk tombol menu dengan animasi</li>
              <li><code className="bg-gray-800 px-2 py-1 rounded text-emerald-400">game_manager.gd</code> - Mengatur logika game, respawn, win/lose condition</li>
              <li><code className="bg-gray-800 px-2 py-1 rounded text-emerald-400">menucam.gd</code> - Camera di menu utama dengan efek shake dan music</li>
              <li><code className="bg-gray-800 px-2 py-1 rounded text-emerald-400">monster_ai.gd</code> - AI monster dengan sistem patrol dan chase</li>
              <li><code className="bg-gray-800 px-2 py-1 rounded text-emerald-400">spot_light_3d.gd</code> - Efek lampu berkedip untuk atmosfer horror</li>
              <li><code className="bg-gray-800 px-2 py-1 rounded text-emerald-400">ui_manager.gd</code> - Mengelola UI seperti fade screen dan pesan game</li>
            </ul>
          </div>
        </Section>

        {/* KONSEP DASAR - BARU! */}
        <Section id="basics" title="🎓 Konsep Dasar - Wajib Dipahami Dulu!" icon={Book}>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-sm text-gray-300 font-semibold text-yellow-300">
                ⚠️ PENTING: Baca bagian ini dulu sebelum lanjut! Ini menjelaskan istilah-istilah yang akan sering muncul.
              </p>
            </div>

            {/* Delta Time */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">⏱️ Delta Time (delta)</h4>
              <p className="text-gray-300 mb-2">
                <strong>Analogi sederhana:</strong> Bayangkan kamu lagi nonton film. Kadang film berjalan 24 frame per detik, 
                kadang 30 fps, kadang 60 fps. Delta adalah "jeda waktu" antara frame satu dengan frame berikutnya.
              </p>
              <div className="bg-blue-900/20 border border-blue-700/50 p-3 rounded mt-2 border border-blue-700/50">
                <p className="text-sm text-blue-300"><strong>Contoh:</strong></p>
                <p className="text-sm text-blue-300">• Jika game berjalan 60 FPS, delta ≈ 0.016 detik (1/60)</p>
                <p className="text-sm text-blue-300">• Jika game lag dan cuma 30 FPS, delta ≈ 0.033 detik (1/30)</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-700/50 p-3 rounded mt-2 border border-emerald-700/50">
                <p className="text-sm text-emerald-300"><strong>Kenapa penting?</strong></p>
                <p className="text-sm text-emerald-300">
                  Tanpa delta, mobil di komputer cepat bergerak lebih kencang dari komputer lambat. 
                  Dengan delta, semua komputer geraknya sama: <code className="bg-gray-200 px-1">velocity * delta</code>
                </p>
              </div>
            </div>

            {/* Tween */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">✨ Tween (Animasi Otomatis)</h4>
              <p className="text-gray-300 mb-2">
                <strong>Analogi sederhana:</strong> Seperti "autopilot" untuk animasi. Kamu bilang: 
                "Pindahkan objek ini dari posisi A ke B dalam 2 detik", lalu Godot otomatis gerakin smooth.
              </p>
              <div className="bg-blue-50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Tanpa Tween (manual, ribet):</strong></p>
                <CodeBlock code={`# Harus tulis sendiri pergerakan setiap frame
position.x += 0.1  # Gerak dikit-dikit tiap frame
# Susah buat smooth, susah kontrol durasi`} />
              </div>
              <div className="bg-emerald-900/20 border border-emerald-700/50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Dengan Tween (otomatis, gampang):</strong></p>
                <CodeBlock code={`# Tinggal bilang "pindah ke posisi (10, 5) dalam 2 detik"
var tween = create_tween()
tween.tween_property(objek, "position", Vector2(10, 5), 2.0)
# Godot yang handle smooth-nya!`} />
              </div>
              <p className="text-sm text-gray-200 mt-2">
                <strong>Istilah penting:</strong>
              </p>
              <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                <li><code className="bg-gray-200 px-1">create_tween()</code> = Buat "autopilot" baru</li>
                <li><code className="bg-gray-200 px-1">tween_property()</code> = Atur properti apa yang mau dianimasikan</li>
                <li><code className="bg-gray-200 px-1">set_loops()</code> = Ulang terus (loop)</li>
                <li><code className="bg-gray-200 px-1">kill()</code> = Matikan animasi (stop autopilot)</li>
              </ul>
            </div>

            {/* Signal */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">📡 Signal (Sistem Pemberitahuan)</h4>
              <p className="text-gray-300 mb-2">
                <strong>Analogi sederhana:</strong> Seperti alarm atau notifikasi HP. Ketika sesuatu terjadi, 
                signal kasih tau semua yang "subscribe" (yang mau dengerin).
              </p>
              <div className="bg-blue-50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Contoh di dunia nyata:</strong></p>
                <p className="text-sm text-gray-200">
                  • Tombol diklik → signal "pressed" muncul → fungsi _on_pressed() dipanggil<br/>
                  • Player masuk area → signal "body_entered" muncul → fungsi _on_area_entered() dipanggil<br/>
                  • Timer habis → signal "timeout" muncul → fungsi tertentu dipanggil
                </p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-700/50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Cara pakai Signal:</strong></p>
                <CodeBlock code={`# "Aku mau dengerin signal pressed dari button ini"
button.pressed.connect(_on_button_pressed)

# Nanti kalau button diklik, fungsi ini jalan otomatis
func _on_button_pressed():
    print("Button diklik!")`} />
              </div>
              <p className="text-sm text-gray-200 mt-2">
                <strong>Kenapa gak langsung panggil fungsi?</strong> Biar fleksibel! 
                Satu signal bisa kasih tau banyak fungsi sekaligus (one-to-many).
              </p>
            </div>

            {/* Vector & Position */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">📍 Vector3 & Position (Koordinat 3D)</h4>
              <p className="text-gray-300 mb-2">
                <strong>Analogi sederhana:</strong> Alamat di dunia 3D. Vector3 punya 3 angka: X, Y, Z.
              </p>
              <div className="bg-blue-50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Sistem koordinat:</strong></p>
                <p className="text-sm text-gray-200">
                  • <strong>X</strong> = kiri-kanan (minus = kiri, plus = kanan)<br/>
                  • <strong>Y</strong> = atas-bawah (minus = bawah, plus = atas)<br/>
                  • <strong>Z</strong> = depan-belakang (minus = belakang, plus = depan)
                </p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-700/50 p-3 rounded mt-2">
                <CodeBlock code={`# Posisi di koordinat (5, 2, 3)
# Artinya: 5 meter ke kanan, 2 meter ke atas, 3 meter ke depan
position = Vector3(5, 2, 3)

# Pindah 1 meter ke atas
position.y += 1  # Sekarang jadi (5, 3, 3)`} />
              </div>
              <p className="text-sm text-gray-200 mt-2">
                <strong>Global vs Local:</strong>
              </p>
              <ul className="text-sm text-gray-300 list-disc list-inside">
                <li><code className="bg-gray-200 px-1">global_position</code> = Posisi di "peta dunia"</li>
                <li><code className="bg-gray-200 px-1">position</code> = Posisi relatif terhadap parent</li>
              </ul>
            </div>

            {/* Lerp */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">🔄 Lerp (Linear Interpolation)</h4>
              <p className="text-gray-300 mb-2">
                <strong>Analogi sederhana:</strong> Gerakan "smooth" dari A ke B. Bukan lompat langsung, tapi pelan-pelan.
              </p>
              <div className="bg-blue-50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Cara kerja:</strong></p>
                <CodeBlock code={`# lerp(dari, ke, berapa_persen)
# lerp(0, 10, 0.5) = 5 (tengah-tengah antara 0 dan 10)
# lerp(0, 10, 0.1) = 1 (10% dari 0 ke 10)
# lerp(0, 10, 0.9) = 9 (90% dari 0 ke 10)

# Contoh: Rotasi smooth menghadap musuh
rotation.y = lerp(rotation.y, target_rotation, 0.1)
# Setiap frame, putar 10% menuju target = smooth!`} />
              </div>
              <p className="text-sm text-gray-200 mt-2">
                <strong>Kenapa pakai lerp?</strong> Biar gerakan gak kaku. Seperti beda antara "melompat" vs "berjalan pelan".
              </p>
            </div>

            {/* Await */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">⏸️ Await (Tunggu Sebentar)</h4>
              <p className="text-gray-300 mb-2">
                <strong>Analogi sederhana:</strong> Seperti pause di tengah kode. "Tunggu dulu sampai sesuatu selesai, baru lanjut."
              </p>
              <div className="bg-blue-50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Tanpa await (langsung, gak nunggu):</strong></p>
                <CodeBlock code={`print("Mulai animasi")
tween.tween_property(...)  # Animasi jalan
print("Ganti scene")  # LANGSUNG ganti, animasi belum selesai!`} />
              </div>
              <div className="bg-emerald-900/20 border border-emerald-700/50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Dengan await (tunggu dulu):</strong></p>
                <CodeBlock code={`print("Mulai animasi")
await tween.finished  # TUNGGU sampai animasi selesai
print("Ganti scene")  # Baru ganti setelah animasi done`} />
              </div>
              <p className="text-sm text-gray-200 mt-2">
                <strong>Contoh lain:</strong>
              </p>
              <CodeBlock code={`# Tunggu 3 detik
await get_tree().create_timer(3.0).timeout
print("3 detik sudah lewat!")`} />
            </div>

            {/* Node & Scene Tree */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">🌳 Node & Scene Tree (Struktur Game)</h4>
              <p className="text-gray-300 mb-2">
                <strong>Analogi sederhana:</strong> Game Godot seperti pohon keluarga. Ada parent, child, sibling.
              </p>
              <div className="bg-blue-50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Contoh struktur:</strong></p>
                <CodeBlock code={`Player (parent)
├── Camera3D (child)
├── CollisionShape3D (child)
└── MeshInstance3D (child)

# Camera adalah "anak" dari Player
# Kalau Player pindah, Camera ikut pindah`} />
              </div>
              <div className="bg-emerald-900/20 border border-emerald-700/50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Istilah penting:</strong></p>
                <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                  <li><code className="bg-gray-200 px-1">add_child(node)</code> = Tambahkan node sebagai anak</li>
                  <li><code className="bg-gray-200 px-1">get_parent()</code> = Ambil node parent</li>
                  <li><code className="bg-gray-200 px-1">get_node("NamaNode")</code> = Cari node dengan nama tertentu</li>
                  <li><code className="bg-gray-200 px-1">$NamaNode</code> = Shortcut untuk get_node (lebih singkat!)</li>
                </ul>
              </div>
            </div>

            {/* Export Variables */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">⚙️ @export (Variabel yang Bisa Diedit di Editor)</h4>
              <p className="text-gray-300 mb-2">
                <strong>Analogi sederhana:</strong> Seperti "settings" yang bisa diubah tanpa edit kode. 
                Game designer bisa tweak nilai tanpa bantuan programmer!
              </p>
              <div className="bg-blue-50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Tanpa @export:</strong></p>
                <CodeBlock code={`# Harus edit kode tiap mau ganti speed
var speed = 5.0

# Mau ganti jadi 10? Harus edit script, save, reload`} />
              </div>
              <div className="bg-emerald-900/20 border border-emerald-700/50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Dengan @export:</strong></p>
                <CodeBlock code={`# Muncul di Inspector Godot, bisa diedit langsung!
@export var speed: float = 5.0

# Tinggal geser slider di Inspector, langsung update!`} />
              </div>
              <p className="text-sm text-gray-200 mt-2">
                <strong>Macam-macam @export:</strong>
              </p>
              <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                <li><code className="bg-gray-200 px-1">@export var hp: int</code> = Angka bulat (1, 2, 3...)</li>
                <li><code className="bg-gray-200 px-1">@export var speed: float</code> = Angka desimal (5.5, 3.14...)</li>
                <li><code className="bg-gray-200 px-1">@export var player: Node3D</code> = Reference ke node lain</li>
                <li><code className="bg-gray-200 px-1">@export_range(0, 100)</code> = Angka dengan slider 0-100</li>
              </ul>
            </div>

            {/* Velocity & move_and_slide */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">🏃 Velocity & move_and_slide (Gerakan Fisik)</h4>
              <p className="text-gray-300 mb-2">
                <strong>Analogi sederhana:</strong> Velocity = "kecepatan dan arah". move_and_slide = "jalan sesuai velocity tapi jangan tembus dinding".
              </p>
              <div className="bg-blue-50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Cara kerja:</strong></p>
                <CodeBlock code={`# Velocity punya 3 komponen: x, y, z
velocity = Vector3(5, 0, 3)
# Artinya: gerak 5 m/s ke kanan, 0 m/s vertikal, 3 m/s ke depan

# Aplikasikan velocity dengan collision detection
move_and_slide()
# Godot otomatis: gerak sesuai velocity + detect tabrakan`} />
              </div>
              <div className="bg-emerald-900/20 border border-emerald-700/50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Contoh gravity:</strong></p>
                <CodeBlock code={`# Kalau tidak di lantai, jatuh ke bawah
if not is_on_floor():
    velocity.y -= gravity * delta  # Turun makin cepat
else:
    velocity.y = 0  # Di lantai, stop jatuh

move_and_slide()  # Aplikasikan gerakan`} />
              </div>
              <p className="text-sm text-gray-200 mt-2">
                <strong>Kenapa * delta?</strong> Biar gerakan konsisten di semua FPS! (ingat penjelasan delta di atas)
              </p>
            </div>

            {/* Raycast */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">🔦 RayCast (Laser Invisible)</h4>
              <p className="text-gray-300 mb-2">
                <strong>Analogi sederhana:</strong> Seperti sinar laser dari Star Wars, tapi invisible. 
                Dipakai untuk cek "apa ada sesuatu di depan sana?"
              </p>
              <div className="bg-blue-50 p-3 rounded mt-2">
                <p className="text-sm text-gray-200"><strong>Contoh penggunaan:</strong></p>
                <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                  <li>Monster cek "apa aku bisa lihat player?" → RayCast dari mata monster ke player</li>
                  <li>Sniper cek "apa peluru bakal kena target?" → RayCast dari senjata ke target</li>
                  <li>AI cek "apa ada dinding di depan?" → RayCast ke depan</li>
                </ul>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-700/50 p-3 rounded mt-2">
                <CodeBlock code={`# Set arah raycast (10 meter ke depan)
raycast.target_position = Vector3(0, 0, 10)

# Cek apakah raycast kena sesuatu
if raycast.is_colliding():
    var objek = raycast.get_collider()
    print("Ketemu: ", objek.name)
else:
    print("Ga kena apa-apa")`} />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded mt-6">
              <p className="text-sm text-gray-300 font-semibold text-gray-50">
                ✅ Setelah paham konsep dasar di atas, kamu siap untuk baca penjelasan kode di bawah! 
                Kalau lupa, bisa scroll ke atas untuk baca lagi kapan saja.
              </p>
            </div>
          </div>
        </Section>

        {/* Button.gd */}
        <Section id="button" title="🔘 button.gd - Script Tombol Menu" icon={Code}>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-200">
                <strong>Fungsi Utama:</strong> Script ini mengatur tombol di menu utama. Tombol akan berkedip (blink) untuk menarik perhatian, 
                dan saat diklik akan memulai animasi transisi (fade UI → gerak kamera → fade to black → ganti scene).
              </p>
            </div>
            
            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi show_day_one()</h3>
            <CodeBlock code={`func show_day_one():
    if is_fading:
        return
    is_fading = true
    
    # Start dengan layar hitam
    fade_rect.color = Color(0, 0, 0, 1)
    
    # Show DAY 1 message
    message_label.text = "DAY 1"
    message_label.add_theme_font_size_override("font_size", 72)
    
    var msg_tween = create_tween()
    msg_tween.tween_property(message_label, "modulate:a", 1.0, 0.5)
    
    # Hold for 2 seconds
    await get_tree().create_timer(2.0).timeout
    
    # Fade out everything
    var fade_out = create_tween()
    fade_out.set_parallel(true)
    fade_out.tween_property(message_label, "modulate:a", 0.0, 0.5)
    fade_out.tween_property(fade_rect, "color:a", 0.0, 1.0)
    
    await fade_out.finished
    is_fading = false`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Baris 2-4:</strong> Guard clause - jika sedang fading, return (prevent overlap)</li>
                <li><strong>Baris 7:</strong> Layar mulai hitam penuh (alpha = 1)</li>
                <li><strong>Baris 10-11:</strong> Set text "DAY 1" dengan font size 72px (besar)</li>
                <li><strong>Baris 13-14:</strong> Fade in text dari alpha 0 ke 1 (muncul pelan-pelan)</li>
                <li><strong>Baris 17:</strong> await = tunggu 2 detik (player baca pesan)</li>
                <li><strong>Baris 20-23:</strong> Fade out text DAN layar hitam secara bersamaan (parallel)</li>
                <li><strong>Baris 25:</strong> Tunggu sampai animasi selesai</li>
                <li><strong>Timeline:</strong> Hitam → Text muncul (0.5s) → Hold (2s) → Text + layar fade out (1s) → Game start</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi show_death_message()</h3>
            <CodeBlock code={`func show_death_message():
    if is_fading:
        return
    is_fading = true
    
    current_day += 1
    
    # Instant black screen
    fade_rect.color = Color(0, 0, 0, 1)
    
    # Show day message
    message_label.text = "DAY " + str(current_day)
    message_label.add_theme_font_size_override("font_size", 72)
    message_label.add_theme_color_override("font_color", Color.WHITE)
    
    var msg_tween = create_tween()
    msg_tween.tween_property(message_label, "modulate:a", 1.0, 0.3)
    
    # Hold for 2 seconds
    await get_tree().create_timer(2.0).timeout
    
    # Fade out everything
    var fade_out = create_tween()
    fade_out.set_parallel(true)
    fade_out.tween_property(message_label, "modulate:a", 0.0, 0.5)
    fade_out.tween_property(fade_rect, "color:a", 0.0, 1.0)
    
    await fade_out.finished
    is_fading = false`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Fungsi ini dipanggil saat player mati TAPI masih ada nyawa</strong></li>
                <li><strong>Baris 6:</strong> Increment hari (DAY 1 → DAY 2 → DAY 3)</li>
                <li><strong>Baris 9:</strong> Langsung layar hitam (instant, tidak fade)</li>
                <li><strong>Baris 12:</strong> str() convert angka jadi string. str(2) = "2"</li>
                <li><strong>Baris 14:</strong> Override warna font jadi putih</li>
                <li><strong>Perbedaan dengan show_day_one:</strong> Ini lebih cepat (0.3s vs 0.5s) karena player sudah panik</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi show_game_over()</h3>
            <CodeBlock code={`func show_game_over():
    if is_fading:
        return
    is_fading = true
    
    # Fade to black
    var tween = create_tween()
    tween.tween_property(fade_rect, "color:a", 1.0, 1.0)
    
    await tween.finished
    
    # Show YOU'RE DEAD message
    message_label.text = "YOU'RE DEAD"
    message_label.add_theme_font_size_override("font_size", 72)
    message_label.add_theme_color_override("font_color", Color(1.0, 0.2, 0.2))
    
    var msg_tween = create_tween()
    msg_tween.tween_property(message_label, "modulate:a", 1.0, 0.5)
    
    # Hold for 3 seconds
    await get_tree().create_timer(2.5).timeout
    
    is_fading = false`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Fungsi ini dipanggil saat nyawa habis (game over)</strong></li>
                <li><strong>Baris 7-8:</strong> Fade to black selama 1 detik</li>
                <li><strong>Baris 10:</strong> Tunggu fade selesai</li>
                <li><strong>Baris 15:</strong> Color(1.0, 0.2, 0.2) = merah (R=full, G=sedikit, B=sedikit)</li>
                <li><strong>Baris 21:</strong> Hold 2.5 detik, setelah itu game_manager akan ganti scene ke menu</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi show_escaped_message()</h3>
            <CodeBlock code={`func show_escaped_message():
    if is_fading:
        return
    is_fading = true
    
    # Fade to black
    var tween = create_tween()
    tween.tween_property(fade_rect, "color:a", 1.0, 1.0)
    
    await tween.finished
    
    message_label.text = "YOU'VE ESCAPED!"
    message_label.add_theme_font_size_override("font_size", 64)
    message_label.add_theme_color_override("font_color", Color(0.2, 1.0, 0.3))
    
    var msg_tween = create_tween()
    msg_tween.tween_property(message_label, "modulate:a", 1.0, 0.5)
    
    await get_tree().create_timer(3.0).timeout
    
    is_fading = false`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Fungsi ini dipanggil saat player berhasil escape</strong></li>
                <li><strong>Baris 14:</strong> Color(0.2, 1.0, 0.3) = hijau terang (victory color)</li>
                <li><strong>Perbedaan dengan game_over:</strong> Warna hijau vs merah, pesan positif vs negatif</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Spot Light */}
        <Section id="spotlight" title="💡 spot_light_3d.gd - Efek Lampu Berkedip Horror" icon={Code}>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-200">
                <strong>Fungsi Utama:</strong> Membuat efek lampu berkedip (flicker) untuk atmosfer horror. 
                Ada 5 pattern berbeda: Random, Pulse, Stutter, Death, dan Mixed.
              </p>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-4">Export Variables - Flicker Settings</h3>
            <ParamTable params={[
              {name: "flicker_enabled", type: "bool", default: "true", desc: "On/off efek flicker"},
              {name: "min_energy", type: "float", default: "0.1", desc: "Brightness paling gelap saat flicker (0.0 = mati, 1.0 = terang penuh)"},
              {name: "max_energy", type: "float", default: "1.0", desc: "Brightness paling terang"},
              {name: "base_energy", type: "float", default: "0.8", desc: "Brightness normal saat tidak flicker"}
            ]} />

            <h3 className="text-lg font-bold text-gray-100 mt-6">Enum Pattern</h3>
            <CodeBlock code={`@export_enum("Random", "Pulse", "Stutter", "Death", "Mixed") var pattern: int = 4`} />
            <p className="text-gray-200">
              <strong>Penjelasan:</strong> @export_enum membuat dropdown di Inspector dengan 5 pilihan pattern. 
              Default = 4 (Mixed, yang paling kompleks dan horror).
            </p>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Pattern 0: Random Flicker</h3>
            <CodeBlock code={`func random_flicker(delta):
    if flicker_timer >= next_flicker_time:
        flicker_timer = 0.0
        next_flicker_time = randf_range(min_flicker_interval, max_flicker_interval)
        
        # Random blackout total
        if randf() < random_blackout_chance:
            light_energy = 0.0
            await get_tree().create_timer(randf_range(0.05, 0.2)).timeout
            light_energy = base_energy
        else:
            # Flicker normal
            light_energy = randf_range(min_energy, max_energy)`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Konsep:</strong> Lampu berkedip secara random dengan interval tidak pasti</li>
                <li><strong>Baris 2:</strong> Cek apakah sudah waktunya flicker berikutnya</li>
                <li><strong>Baris 4:</strong> randf_range() generate angka random antara min dan max interval</li>
                <li><strong>Baris 7:</strong> randf() generate 0.0-1.0. Jika kurang dari 0.05 (5%), blackout total!</li>
                <li><strong>Baris 8-10:</strong> Matikan lampu sebentar (0.05-0.2 detik) lalu nyalakan lagi</li>
                <li><strong>Baris 13:</strong> Flicker normal - set brightness random antara min_energy dan max_energy</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Pattern 1: Pulse Flicker</h3>
            <CodeBlock code={`func pulse_flicker(delta):
    var pulse = sin(time * pulse_frequency * TAU) * 0.5 + 0.5
    light_energy = lerp(min_energy, max_energy, pulse)`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Konsep:</strong> Lampu berdenyut smooth seperti detak jantung</li>
                <li><strong>Baris 2:</strong> sin() menghasilkan wave -1 sampai 1. TAU = 2*PI (360 derajat)</li>
                <li><strong>* 0.5 + 0.5:</strong> Convert range -1..1 menjadi 0..1 (selalu positif)</li>
                <li><strong>Baris 3:</strong> lerp() interpolasi linear antara min dan max energy sesuai pulse value</li>
                <li><strong>Hasilnya:</strong> Brightness naik-turun smooth secara periodik</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Pattern 2: Stutter Flicker</h3>
            <CodeBlock code={`func stutter_flicker(delta):
    stutter_timer += delta
    
    if stutter_timer < stutter_duration:
        # Rapid flicker
        if int(time * 20) % 2 == 0:
            light_energy = max_energy
        else:
            light_energy = min_energy
    else:
        # Normal
        light_energy = base_energy
        
        if stutter_timer >= stutter_interval:
            stutter_timer = 0.0`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Konsep:</strong> Lampu kedip-kedip cepat (stutter) lalu normal, lalu stutter lagi</li>
                <li><strong>Baris 4-9:</strong> Selama stutter_duration (0.1 detik), lampu on-off cepat 20x per detik</li>
                <li><strong>Baris 6:</strong> int(time * 20) % 2 = cek genap/ganjil untuk toggle on/off</li>
                <li><strong>Baris 11-12:</strong> Setelah stutter, kembali ke base_energy (normal)</li>
                <li><strong>Baris 14-15:</strong> Reset timer setelah stutter_interval (2 detik) untuk stutter berikutnya</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Pattern 4: Mixed Flicker (Paling Horror!)</h3>
            <CodeBlock code={`func mixed_flicker(delta):
    # Base pulse
    var pulse = sin(time * pulse_frequency * TAU) * 0.3 + 0.7
    var target_energy = base_energy * pulse
    
    # Random flicker overlay
    if flicker_timer >= next_flicker_time:
        flicker_timer = 0.0
        next_flicker_time = randf_range(min_flicker_interval, max_flicker_interval)
        
        if randf() < random_blackout_chance:
            light_energy = 0.0
            await get_tree().create_timer(randf_range(0.05, 0.15)).timeout
        else:
            var random_mod = randf_range(0.5, 1.5)
            light_energy = clamp(target_energy * random_mod, min_energy, max_energy)
    else:
        light_energy = lerp(light_energy, target_energy, delta * 5.0)`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Konsep:</strong> Kombinasi pulse + random flicker = efek paling realistis dan menakutkan</li>
                <li><strong>Baris 3:</strong> Base pulse dengan amplitude lebih kecil (0.3) untuk efek subtle</li>
                <li><strong>Baris 4:</strong> Target brightness = base_energy dikali pulse value</li>
                <li><strong>Baris 7-16:</strong> Overlay random flicker di atas pulse</li>
                <li><strong>Baris 15:</strong> random_mod = modifier 0.5-1.5x untuk variasi brightness</li>
                <li><strong>Baris 16:</strong> clamp() pastikan nilai tetap dalam range min-max energy</li>
                <li><strong>Baris 18:</strong> Smooth lerp ke target dengan factor 5.0 (cukup cepat tapi tidak instant)</li>
                <li><strong>Hasilnya:</strong> Lampu berdenyut smooth + kadang spike/drop random + kadang blackout = HORROR MAX!</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Menu Camera */}
        <Section id="menucam" title="📷 menucam.gd - Camera Menu dengan Shake & Music" icon={Code}>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-200">
                <strong>Fungsi Utama:</strong> Camera di main menu dengan efek shake halus untuk atmosfer horror, 
                plus background music yang loop dan fade out saat transisi ke scene lain.
              </p>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-4">Export Variables</h3>
            <ParamTable params={[
              {name: "amplitude", type: "float", default: "0.05", desc: "Seberapa kuat camera goyang (dalam unit Godot). 0.05 = goyang halus"},
              {name: "speed", type: "float", default: "1.5", desc: "Seberapa cepat camera goyang. 1.5 = sedang"},
              {name: "background_music", type: "AudioStream", default: "null", desc: "File audio untuk background music menu"},
              {name: "music_volume", type: "float", default: "-10.0", desc: "Volume music dalam decibel (-80 = silent, 0 = max)"}
            ]} />

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi _ready()</h3>
            <CodeBlock code={`func _ready():
    base_position = position
    
    # Setup music player
    music_player = AudioStreamPlayer.new()
    add_child(music_player)
    
    if background_music:
        music_player.stream = background_music
        music_player.volume_db = music_volume
        music_player.autoplay = true
        
        # Setup looping
        if background_music is AudioStreamWAV:
            background_music.loop_mode = AudioStreamWAV.LOOP_FORWARD
        elif background_music is AudioStreamOggVorbis:
            background_music.loop = true
        elif background_music is AudioStreamMP3:
            background_music.loop = true
        
        music_player.play()
    
    get_tree().node_removed.connect(_on_node_removed)`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Baris 2:</strong> Simpan posisi awal camera sebagai base untuk shake effect</li>
                <li><strong>Baris 5-6:</strong> Buat AudioStreamPlayer baru dan tambahkan sebagai child</li>
                <li><strong>Baris 9-11:</strong> Set audio stream, volume, dan autoplay</li>
                <li><strong>Baris 14-19:</strong> Set loop mode sesuai tipe audio file (setiap format beda cara)</li>
                <li><strong>Baris 23:</strong> Listen untuk signal node_removed (akan dipanggil saat scene diganti)</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi _process()</h3>
            <CodeBlock code={`func _process(delta):
    Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
    time += delta * speed
    var x = sin(time) * amplitude
    var y = sin(time * 2.0) * amplitude * 0.5
    position = base_position + Vector3(x, y, 0)`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan Camera Shake:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Baris 2:</strong> Pastikan mouse cursor terlihat (tidak locked seperti saat gameplay)</li>
                <li><strong>Baris 3:</strong> Increment time dengan delta * speed untuk kontrol kecepatan shake</li>
                <li><strong>Baris 4:</strong> sin(time) menghasilkan wave -1 sampai 1, dikali amplitude untuk horizontal shake</li>
                <li><strong>Baris 5:</strong> sin(time * 2.0) = frekuensi 2x lebih cepat untuk vertical, amplitude lebih kecil (0.5x)</li>
                <li><strong>Mengapa 2.0?</strong> Biar horizontal dan vertical shake tidak sinkron = lebih natural</li>
                <li><strong>Baris 6:</strong> Posisi final = base + offset shake (x, y)</li>
                <li><strong>Hasilnya:</strong> Camera goyang halus seperti handheld camera horror!</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi fade_out_music()</h3>
            <CodeBlock code={`func fade_out_music(duration: float = 1.0):
    if not music_player or not music_player.playing:
        return
    
    var tween = create_tween()
    tween.tween_property(music_player, "volume_db", -80, duration)
    tween.tween_callback(music_player.stop)
    print("Fading out music...")`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Parameter duration:</strong> Berapa lama fade out (default 1.0 detik)</li>
                <li><strong>Baris 2-3:</strong> Validasi - cek apakah music player ada dan sedang playing</li>
                <li><strong>Baris 6:</strong> Tween volume dari nilai sekarang ke -80db (hampir silent)</li>
                <li><strong>Baris 7:</strong> tween_callback() panggil music_player.stop() setelah tween selesai</li>
                <li><strong>Kenapa -80 bukan 0?</strong> -80db = praktis tidak terdengar. 0db = volume maksimal!</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi _on_node_removed()</h3>
            <CodeBlock code={`func _on_node_removed(node: Node):
    # Cek kalau yang di-remove adalah camera ini
    if node == self:
        # Fade out music saat camera/scene dihapus
        if music_player and music_player.playing:
            fade_out_music(0.5)`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Fungsi ini otomatis dipanggil saat ada node yang di-remove dari scene tree</strong></li>
                <li><strong>Baris 3:</strong> Cek apakah yang di-remove adalah camera ini sendiri</li>
                <li><strong>Baris 5-6:</strong> Jika ya, fade out music dengan durasi 0.5 detik</li>
                <li><strong>Kenapa perlu?</strong> Saat ganti scene, camera akan di-remove. Music harus fade out smooth, tidak stop tiba-tiba</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Player.gd - SCRIPT BARU! */}
        <Section id="player" title="🎮 player.gd - Kontrol Karakter Pemain" icon={Code}>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-200">
                <strong>Fungsi Utama:</strong> Script ini mengontrol semua yang berhubungan dengan pemain: 
                gerakan (WASD), lompat, sprint, rotasi kamera dengan mouse, head bobbing saat jalan, 
                flashlight, footstep sounds, sistem nyawa, dan respawn saat tertangkap monster.
              </p>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-4">Deklarasi Class & Inheritance</h3>
            <CodeBlock code="extends CharacterBody3D" />
            <p className="text-gray-200">
              <strong>Penjelasan:</strong> Script ini extends (mewarisi) dari CharacterBody3D, yaitu node khusus Godot 
              untuk karakter yang bisa bergerak dengan fisika (gravity, collision, dll). Ini berbeda dari RigidBody3D 
              yang untuk objek fisik seperti bola atau kotak.
            </p>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Export Variables - Movement</h3>
            <CodeBlock code={`@export_group("Movement")
@export var speed := 5.0
@export var sprint_speed := 8.0
@export var jump_velocity := 4.5
@export var mouse_sensitivity := 0.003`} />
            <ParamTable params={[
              {name: "speed", type: "float", default: "5.0", desc: "Kecepatan jalan normal (meter/detik). 5.0 = jalan santai"},
              {name: "sprint_speed", type: "float", default: "8.0", desc: "Kecepatan lari/sprint saat hold Shift (meter/detik)"},
              {name: "jump_velocity", type: "float", default: "4.5", desc: "Kekuatan lompat ke atas. Makin besar = lompat makin tinggi"},
              {name: "mouse_sensitivity", type: "float", default: "0.003", desc: "Seberapa sensitif gerakan mouse untuk rotasi kamera. Kecil = lambat, besar = cepat"}
            ]} />

            <h3 className="text-lg font-bold text-gray-100 mt-6">Export Variables - Head Bob</h3>
            <CodeBlock code={`@export_group("Head Bob")
@export var bob_freq := 2.0
@export var bob_amp := 0.08
@export var t_bob := 0.0`} />
            <ParamTable params={[
              {name: "bob_freq", type: "float", default: "2.0", desc: "Frekuensi bobbing (seberapa cepat kepala naik-turun saat jalan)"},
              {name: "bob_amp", type: "float", default: "0.08", desc: "Amplitude bobbing (seberapa jauh kepala naik-turun). 0.08 = subtle"},
              {name: "t_bob", type: "float", default: "0.0", desc: "Timer internal untuk hitung head bob (jangan diubah manual)"}
            ]} />
            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-3 rounded mt-2">
              <p className="text-sm text-gray-200">
                <strong>Apa itu Head Bob?</strong> Efek kamera naik-turun halus saat karakter berjalan, 
                seperti di game FPS modern (CS:GO, Valorant). Ini bikin gerakan lebih realistis dan immersive.
              </p>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Export Variables - Audio</h3>
            <CodeBlock code={`@export_group("Audio")
@export var footstep_sound: AudioStream
@export var caught_sound: AudioStream
@export var death_sound: AudioStream`} />
            <ParamTable params={[
              {name: "footstep_sound", type: "AudioStream", default: "null", desc: "Sound effect langkah kaki (diputar berulang saat jalan)"},
              {name: "caught_sound", type: "AudioStream", default: "null", desc: "Sound saat tertangkap monster tapi masih ada nyawa"},
              {name: "death_sound", type: "AudioStream", default: "null", desc: "Sound saat nyawa habis (game over)"}
            ]} />

            <h3 className="text-lg font-bold text-gray-100 mt-6">@onready Variables - References ke Child Nodes</h3>
            <CodeBlock code={`@onready var head: Node3D = $Head
@onready var camera: Camera3D = $Head/Camera3D
@onready var flashlight: SpotLight3D = $Head/Camera3D/Flashlight
@onready var footstep_player: AudioStreamPlayer = $FootstepPlayer`} />
            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-3 rounded mt-2">
              <p className="text-sm text-gray-200 mb-2">
                <strong>Penjelasan @onready:</strong> Variabel ini diisi otomatis saat node ready dengan mengambil child nodes.
              </p>
              <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                <li><code className="bg-gray-200 px-1">$Head</code> = Node untuk kepala (bisa rotate vertical untuk look up/down)</li>
                <li><code className="bg-gray-200 px-1">$Head/Camera3D</code> = Camera di dalam Head (child of child)</li>
                <li><code className="bg-gray-200 px-1">$Head/Camera3D/Flashlight</code> = Lampu senter di kamera</li>
                <li><code className="bg-gray-200 px-1">$FootstepPlayer</code> = AudioStreamPlayer untuk footstep sounds</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Private Variables</h3>
            <CodeBlock code={`var gravity = ProjectSettings.get_setting("physics/3d/default_gravity")
var lives := 4  # 4 nyawa
var is_dead := false
var is_moving := false
var footstep_timer := 0.0
var footstep_interval := 0.5
var jc : bool`} />
            <ParamTable params={[
              {name: "gravity", type: "float", default: "9.8", desc: "Nilai gravitasi dari Project Settings (biasanya 9.8 seperti dunia nyata)"},
              {name: "lives", type: "int", default: "4", desc: "Jumlah nyawa pemain (4 = DAY 1, DAY 2, DAY 3, DAY 4, lalu game over)"},
              {name: "is_dead", type: "bool", default: "false", desc: "Flag apakah player sedang mati/freeze (true = tidak bisa gerak)"},
              {name: "is_moving", type: "bool", default: "false", desc: "Flag apakah player sedang jalan (untuk head bob dan footsteps)"},
              {name: "footstep_timer", type: "float", default: "0.0", desc: "Timer countdown untuk footstep berikutnya"},
              {name: "footstep_interval", type: "float", default: "0.5", desc: "Jarak waktu antar footstep (0.5 detik = 2 langkah per detik)"},
              {name: "jc", type: "bool", default: "false", desc: "Flag untuk toggle mouse mode (captured/visible) saat tekan ESC"}
            ]} />

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi _ready()</h3>
            <CodeBlock code={`func _ready():
    Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
    if flashlight:
        flashlight.visible = flashlight_enabled
    
    # Setup footstep audio
    if not footstep_player:
        footstep_player = AudioStreamPlayer.new()
        add_child(footstep_player)
    
    if footstep_sound:
        footstep_player.stream = footstep_sound
    
    # Show DAY 1 on first spawn
    get_tree().call_group("ui_manager", "show_day_one")`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan Baris per Baris:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Baris 2:</strong> <code>MOUSE_MODE_CAPTURED</code> = cursor hilang dan terkunci di tengah (seperti FPS games). Mouse movement jadi camera rotation</li>
                <li><strong>Baris 3-4:</strong> Set flashlight visible/invisible sesuai setting flashlight_enabled</li>
                <li><strong>Baris 7-9:</strong> Jika footstep_player belum ada di scene, buat baru secara programmatic (fallback)</li>
                <li><strong>Baris 11-12:</strong> Set audio stream untuk footsteps</li>
                <li><strong>Baris 15:</strong> Panggil show_day_one() di ui_manager untuk animasi "DAY 1" saat game start</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi _input() - Mouse Look & Flashlight</h3>
            <CodeBlock code={`func _input(event):
    if event is InputEventMouseMotion and Input.get_mouse_mode() == Input.MOUSE_MODE_CAPTURED:
        rotate_y(-event.relative.x * mouse_sensitivity)
        head.rotate_x(-event.relative.y * mouse_sensitivity)
        head.rotation.x = clamp(head.rotation.x, -deg_to_rad(89), deg_to_rad(89))
    
    if event.is_action_pressed("ui_cancel"):
        if not jc:
            Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
            jc = true
        else: 
            Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
            jc = false
    
    if event.is_action_pressed("toggle_flashlight") and flashlight:
        flashlight.visible = !flashlight.visible`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan Mouse Look System:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Baris 2:</strong> Cek apakah event adalah mouse motion DAN mouse dalam mode captured</li>
                <li><strong>Baris 3:</strong> <code>rotate_y()</code> putar BODY player kiri-kanan (horizontal) sesuai gerakan mouse X</li>
                <li><strong>Baris 4:</strong> <code>rotate_x()</code> putar HEAD atas-bawah (vertical) sesuai gerakan mouse Y</li>
                <li><strong>Baris 5:</strong> <code>clamp()</code> batasi rotasi kepala max 89° (tidak bisa lihat ke belakang penuh)</li>
                <li><strong>Kenapa minus (-):</strong> event.relative adalah arah mouse, dikali minus biar intuitif (gerak kanan = lihat kanan)</li>
                <li><strong>Kenapa pisah body & head?</strong> Agar bisa look up/down tanpa body ikut miring (seperti FPS real)</li>
              </ul>
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mt-3 mb-2">ESC untuk Toggle Mouse:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Baris 7-13:</strong> Tekan ESC toggle antara mouse captured (gameplay) dan visible (menu/pause)</li>
                <li><strong>Baris 15-16:</strong> Toggle flashlight on/off dengan tombol F (atau sesuai input map)</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi _physics_process() - Movement & Physics</h3>
            <CodeBlock code={`func _physics_process(delta):
    if is_dead:
        return
    
    # Gravity
    if not is_on_floor():
        velocity.y -= gravity * delta

    # Jump
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = jump_velocity

    # Movement
    var input_dir = Input.get_vector("move_left", "move_right", "move_forward", "move_back")
    var direction = (transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()
    
    var is_sprinting = Input.is_action_pressed("sprint")
    var current_speed = sprint_speed if is_sprinting else speed
    
    if direction:
        velocity.x = direction.x * current_speed
        velocity.z = direction.z * current_speed
        is_moving = true
    else:
        velocity.x = move_toward(velocity.x, 0, current_speed)
        velocity.z = move_toward(velocity.z, 0, current_speed)
        is_moving = false

    # Head bob
    if is_on_floor() and direction:
        t_bob += delta * velocity.length()
        camera.transform.origin = _headbob(t_bob)
    else:
        camera.transform.origin = camera.transform.origin.lerp(Vector3.ZERO, delta * 10.0)

    # Footstep sound
    handle_footsteps(delta, is_sprinting)

    move_and_slide()`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan Detail:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Baris 2-3:</strong> Jika player mati, stop semua physics processing (tidak bisa gerak)</li>
                <li><strong>Baris 6-7:</strong> Gravity - jika tidak di lantai, velocity.y turun terus (jatuh makin cepat)</li>
                <li><strong>Baris 10-11:</strong> Jump - tekan Space saat di lantai, set velocity.y ke atas</li>
                <li><strong>Baris 14:</strong> <code>get_vector()</code> ambil input WASD/arrow keys, return Vector2 arah (-1 sampai 1)</li>
                <li><strong>Baris 15:</strong> <code>transform.basis</code> konversi input ke arah lokal player (forward relatif ke rotasi player)</li>
                <li><strong>Baris 17-18:</strong> Cek sprint (Shift), pilih speed sesuai sprint atau tidak</li>
                <li><strong>Baris 20-27:</strong> Set velocity horizontal. Jika ada input = gerak, jika tidak = friction (pelan-pelan berhenti)</li>
                <li><strong>Baris 30-34:</strong> Head bob hanya aktif saat di lantai DAN ada movement</li>
                <li><strong>Baris 37:</strong> Handle footstep sounds (function terpisah)</li>
                <li><strong>Baris 39:</strong> Aplikasikan velocity dengan collision detection</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi _headbob() - Head Bobbing Effect</h3>
            <CodeBlock code={`func _headbob(time) -> Vector3:
    var pos = Vector3.ZERO
    pos.y = sin(time * bob_freq) * bob_amp
    pos.x = cos(time * bob_freq / 2) * bob_amp
    return pos`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan Matematis Head Bob:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Parameter time:</strong> Waktu akumulatif (t_bob) yang increment sesuai kecepatan jalan</li>
                <li><strong>Baris 3:</strong> <code>sin(time * bob_freq)</code> = wave naik-turun untuk gerakan Y (vertical)</li>
                <li><strong>Baris 4:</strong> <code>cos(time * bob_freq / 2)</code> = wave kiri-kanan untuk X, frekuensi setengah dari Y</li>
                <li><strong>Kenapa sin dan cos?</strong> Biar gerakan Y dan X tidak sinkron = lebih natural (seperti jalan manusia real)</li>
                <li><strong>bob_amp (0.08):</strong> Amplitude kecil = gerakan subtle, tidak bikin pusing</li>
                <li><strong>Return:</strong> Offset posisi camera dari titik tengah kepala</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi handle_footsteps()</h3>
            <CodeBlock code={`func handle_footsteps(delta: float, is_sprinting: bool):
    if not is_on_floor() or not is_moving:
        return
    
    # Adjust interval based on sprint
    var current_interval = footstep_interval / (1.5 if is_sprinting else 1.0)
    
    footstep_timer += delta
    
    if footstep_timer >= current_interval:
        footstep_timer = 0.0
        play_footstep(is_sprinting)`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Baris 2-3:</strong> Hanya play footsteps jika di lantai DAN sedang bergerak</li>
                <li><strong>Baris 6:</strong> Saat sprint, interval dibagi 1.5 = footsteps lebih cepat (0.5 / 1.5 = 0.33 detik)</li>
                <li><strong>Baris 8:</strong> Increment timer setiap frame</li>
                <li><strong>Baris 10-12:</strong> Jika timer melebihi interval, reset dan play sound</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi play_footstep()</h3>
            <CodeBlock code={`func play_footstep(is_sprinting: bool):
    if not footstep_player or not footstep_sound:
        return
    
    # Random pitch untuk natural sound
    footstep_player.pitch_scale = randf_range(1.2, 1.4)
    
    # Speed up kalau sprint
    if is_sprinting:
        footstep_player.pitch_scale *= 1.5
    
    footstep_player.play()`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Baris 6:</strong> Random pitch 1.2-1.4 biar setiap footstep sedikit beda (tidak monoton)</li>
                <li><strong>Baris 9-10:</strong> Saat sprint, pitch lebih tinggi (1.5x) = terdengar lebih cepat dan energik</li>
                <li><strong>Kenapa pitch bukan volume?</strong> Pitch change bikin variasi lebih natural untuk footsteps</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi take_damage() - Sistem Nyawa</h3>
            <CodeBlock code={`func take_damage():
    # Cek kalau udah mati, jangan proses lagi!
    if is_dead:
        return
    
    lives -= 1
    print("Lives remaining: ", lives)
    
    if lives <= 0:
        die()
    else:
        # Play caught sound
        if caught_sound:
            var audio = AudioStreamPlayer.new()
            add_child(audio)
            audio.stream = caught_sound
            audio.play()
            audio.finished.connect(func(): audio.queue_free())
        
        # Freeze player sementara
        is_dead = true
        velocity = Vector3.ZERO
        
        # Show death message
        get_tree().call_group("ui_manager", "show_death_message")
        
        # Tunggu 0.5 detik, BARU respawn posisi
        await get_tree().create_timer(0.5).timeout
        get_tree().call_group("game_manager", "respawn_player")
        
        # Tunggu sampai fade selesai baru unfreeze
        await get_tree().create_timer(3.0).timeout
        
        # Unfreeze - layar udah jernih
        is_dead = false`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Flow Lengkap Saat Tertangkap:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Baris 3-4:</strong> Guard - jika sudah dalam proses mati, ignore damage baru (prevent double damage)</li>
                <li><strong>Baris 6:</strong> Kurangi lives (4 → 3 → 2 → 1 → 0)</li>
                <li><strong>Baris 9:</strong> Jika lives habis (≤0), panggil die() untuk game over</li>
                <li><strong>Baris 14-18:</strong> Play caught sound (bukan death sound!) dengan auto cleanup</li>
                <li><strong>Baris 21-22:</strong> Freeze player (is_dead = true) dan stop movement</li>
                <li><strong>Baris 25:</strong> Trigger animasi "DAY 2" / "DAY 3" dll di UI</li>
                <li><strong>Baris 28-29:</strong> Tunggu 0.5s (layar hitam), lalu respawn ke posisi random</li>
                <li><strong>Baris 32-35:</strong> Tunggu 3s lagi (animasi fade out selesai), baru unfreeze player</li>
              </ul>
              <p className="text-sm text-gray-200 mt-3">
                <strong>Total waktu freeze:</strong> 3.5 detik (0.5s + 3.0s) untuk kasih waktu UI animasi selesai 
                dan player safe dari monster (sudah di posisi spawn baru).
              </p>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Fungsi die() - Game Over</h3>
            <CodeBlock code={`func die():
    is_dead = true
    print("Game Over!")
    
    # Play death sound (BUKAN caught sound)
    if death_sound:
        var audio = AudioStreamPlayer.new()
        add_child(audio)
        audio.stream = death_sound
        audio.play()
    
    get_tree().call_group("game_manager", "game_over")`} />

            <div className="bg-yellow-900/20 border border-yellow-700/50 border-l-4 border-yellow-500 p-4 rounded mt-3">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Penjelasan:</p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Baris 2:</strong> Set is_dead = true permanent (tidak di-unfreeze lagi)</li>
                <li><strong>Baris 6-10:</strong> Play death_sound (berbeda dari caught_sound untuk variasi)</li>
                <li><strong>Baris 12:</strong> Panggil game_over() di game_manager untuk handle transisi ke menu</li>
                <li><strong>Perbedaan dengan take_damage:</strong> Tidak ada respawn, langsung ke menu</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Sistem Input Map</h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Input Actions yang Digunakan:</p>
              <ParamTable params={[
                {name: "move_forward", type: "Input", default: "W", desc: "Jalan ke depan"},
                {name: "move_back", type: "Input", default: "S", desc: "Jalan ke belakang"},
                {name: "move_left", type: "Input", default: "A", desc: "Jalan ke kiri (strafe)"},
                {name: "move_right", type: "Input", default: "D", desc: "Jalan ke kanan (strafe)"},
                {name: "ui_accept", type: "Input", default: "Space", desc: "Lompat"},
                {name: "sprint", type: "Input", default: "Shift", desc: "Sprint (lari cepat)"},
                {name: "toggle_flashlight", type: "Input", default: "F", desc: "Nyalakan/matikan flashlight"},
                {name: "ui_cancel", type: "Input", default: "ESC", desc: "Toggle mouse captured/visible"}
              ]} />
              <p className="text-sm text-gray-200 mt-3">
                <strong>Cara set Input Map:</strong> Project → Project Settings → Input Map → Tambahkan action di atas dengan key yang sesuai.
              </p>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mt-6">Struktur Node yang Dibutuhkan</h3>
            <div className="bg-emerald-900/20 border border-emerald-700/50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-sm text-gray-300 font-semibold text-gray-100 mb-2">Hierarchy Scene Player:</p>
              <CodeBlock code={`Player (CharacterBody3D) ← script player.gd di sini
├── CollisionShape3D (bentuk collision player)
├── MeshInstance3D (model 3D player, optional)
├── Head (Node3D) ← untuk rotasi vertical
│   └── Camera3D
│       └── Flashlight (SpotLight3D)
└── FootstepPlayer (AudioStreamPlayer)`} />
              <p className="text-sm text-gray-200 mt-3">
                <strong>Penting:</strong> Head harus Node3D biasa (bukan Camera), karena Camera akan rotate head, 
                sedangkan body player rotate horizontal terpisah.
              </p>
            </div>
          </div>
        </Section>

        {/* Kesimpulan & Tips */}
        <Section id="conclusion" title="🎓 Kesimpulan & Tips Pengembangan" icon={Info}>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">🎯 Konsep-Konsep Penting yang Dipelajari</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>State Machine:</strong> Monster AI menggunakan state PATROL dan CHASE - konsep fundamental dalam game AI</li>
                <li><strong>Async Programming:</strong> Penggunaan await untuk menunggu animasi/timer selesai tanpa blocking</li>
                <li><strong>Tween Animation:</strong> Sistem animasi Godot untuk smooth transitions (fade, movement, rotation)</li>
                <li><strong>Signal System:</strong> Komunikasi antar node dengan .connect() - pattern observer</li>
                <li><strong>Group System:</strong> add_to_group() dan call_group() untuk komunikasi broadcast</li>
                <li><strong>NavigationAgent:</strong> AI pathfinding otomatis menggunakan NavMesh</li>
                <li><strong>RayCast:</strong> Line of Sight detection untuk AI yang lebih realistis</li>
                <li><strong>Audio Management:</strong> Loop, fade in/out, one-shot sounds</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 rounded mt-4">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">💡 Tips Optimasi & Best Practices</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Gunakan @onready:</strong> Untuk get_node() agar lebih efisien dan aman</li>
                <li><strong>Interval Checks:</strong> Tidak perlu cek LOS setiap frame - gunakan timer/interval</li>
                <li><strong>Guard Clauses:</strong> Return early jika kondisi tidak valid (if not player: return)</li>
                <li><strong>State Pattern:</strong> Lebih mudah maintain dibanding if-else panjang</li>
                <li><strong>Tween Cleanup:</strong> Selalu kill() tween lama sebelum buat yang baru</li>
                <li><strong>Validation:</strong> Cek null dengan if node: sebelum akses properti</li>
                <li><strong>Magic Numbers:</strong> Gunakan export variables untuk nilai yang sering diubah</li>
                <li><strong>Debug Prints:</strong> Tambahkan print() untuk debugging, bisa dimatikan dengan flag</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-4 rounded mt-4">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">🚀 Ide Pengembangan Lanjutan</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Multiple Monsters:</strong> Tambahkan lebih banyak monster dengan AI berbeda</li>
                <li><strong>Item System:</strong> Flashlight, keys, health packs</li>
                <li><strong>Stamina System:</strong> Player bisa sprint tapi stamina habis</li>
                <li><strong>Sound Detection:</strong> Monster bisa dengar suara langkah player</li>
                <li><strong>Hiding Spots:</strong> Locker/lemari untuk sembunyi dari monster</li>
                <li><strong>Difficulty Levels:</strong> Easy (monster lambat) sampai Hard (monster cepat + banyak)</li>
                <li><strong>Save System:</strong> Save progress dengan ConfigFile atau JSON</li>
                <li><strong>Multiple Levels:</strong> Berbagai map dengan kesulitan berbeda</li>
                <li><strong>Achievements:</strong> Complete tanpa ketangkap, finish dalam waktu tertentu, dll</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-4 rounded mt-4">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">📚 Resource Belajar Lanjutan</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><strong>Godot Docs:</strong> docs.godotengine.org - dokumentasi resmi lengkap</li>
                <li><strong>GDQuest:</strong> YouTube channel dengan tutorial Godot gratis berkualitas</li>
                <li><strong>Brackeys (Godot):</strong> Tutorial game development yang mudah dipahami</li>
                <li><strong>Game Programming Patterns:</strong> Buku/website tentang design patterns dalam game</li>
                <li><strong>Reddit r/godot:</strong> Komunitas Godot yang aktif dan helpful</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-slate-100 border-l-4 border-gray-500 p-4 rounded mt-4">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">🔧 Troubleshooting Common Issues</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-sm text-gray-50">Monster stuck/tidak bergerak:</p>
                  <p className="text-sm text-gray-300 text-gray-600">• Pastikan NavMesh sudah di-bake di NavigationRegion3D</p>
                  <p className="text-sm text-gray-300 text-gray-600">• Cek patrol_radius tidak terlalu besar</p>
                  <p className="text-sm text-gray-300 text-gray-600">• Gunakan debug print untuk lihat is_target_reachable()</p>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-50">Monster tidak detect player:</p>
                  <p className="text-sm text-gray-300 text-gray-600">• Cek player sudah ada di group "player"</p>
                  <p className="text-sm text-gray-300 text-gray-600">• Pastikan detection_radius cukup besar</p>
                  <p className="text-sm text-gray-300 text-gray-600">• Cek collision layer RayCast dan player</p>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-50">Audio tidak loop:</p>
                  <p className="text-sm text-gray-300 text-gray-600">• Cek tipe audio file (WAV/OGG/MP3)</p>
                  <p className="text-sm text-gray-300 text-gray-600">• Set loop_mode sesuai tipe file</p>
                  <p className="text-sm text-gray-300 text-gray-600">• Pastikan AudioStreamPlayer tidak one_shot</p>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-50">Transisi scene patah-patah:</p>
                  <p className="text-sm text-gray-300 text-gray-600">• Gunakan set_parallel(true) untuk animasi bersamaan</p>
                  <p className="text-sm text-gray-300 text-gray-600">• Pastikan total_time dihitung dengan benar</p>
                  <p className="text-sm text-gray-300 text-gray-600">• Gunakan await untuk sinkronisasi</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-indigo-300 p-6 rounded-lg mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-100 mb-2">🎉 Selamat!</h3>
              <p className="text-gray-300 mb-4">
                Kamu telah mempelajari konsep-konsep penting dalam game development: AI, Animation, Audio, UI/UX, dan State Management. 
                Terus eksplorasi dan jangan takut untuk bereksperimen!
              </p>
              <p className="text-sm text-gray-300 text-gray-600 italic">
                "The best way to learn is by doing. Keep coding, keep creating!" 💻✨
              </p>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-12 p-8 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl text-center border border-cyan-500/30 backdrop-blur">
          <p className="text-gray-300 font-medium mb-2">Dokumentasi ini dibuat dengan untuk memahami game development dengan Godot Engine</p>
          <p className="text-2xl text-gray-200">🎮 Happy Game Development! 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default GameDocumentation;
